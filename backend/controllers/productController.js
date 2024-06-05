const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors"); 
const ApiFeatures = require("../utils/apiFeatures");

//create product (ADMIN)
exports.createProduct = catchAsyncErrors(async(req,res,next)=>{

    req.body.user = req.user.id;
    
    const product = await Product.create(req.body);

    res.status(201).json({
        success:true,
        product
    })
});

//Get all products 
exports.getAllProducts = catchAsyncErrors(async(req,res,next) => {

    // return next (
    //     new ErrorHandler("temp error",500)
    // );
    const resultperpage = 8;
    const productsCount = await Product.countDocuments();
    const apiFeature = new ApiFeatures(Product.find(),req.query)
    .search()
    .filter();
    
    let products = await apiFeature.query;
    let filteredProductsCount = products.length;

    apiFeature.pagination(resultperpage);

     products = await apiFeature.query.clone(); // Use clone to prevent query execution error
    
    res.status(200).json({
        success:true,
        products,
        productsCount,
        resultperpage,
        filteredProductsCount,
    })
    
        
});

//Get single product details
exports.getProductDetails = catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.findById(req.params.id);
    
    //ERROR HANDLING
    if(!product){
        return next(new ErrorHandler("Product not found",404))
        }

        res.status(200).json({
            success:true,
            product
        })
});


//Update product
exports.updateProduct = catchAsyncErrors(async(req,res,next)=>{
    let product = await Product.findById(req.params.id);

    //ERROR HANDLING
    if(!product){
        return next(new ErrorHandler("Product not found",404))
    }

    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });
    res.status(200).json({
        success:true,
        product
    })
});

//Delete product
exports.deleteProduct = catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.findById(req.params.id);

    //ERROR HANDLING
    if(!product){
        return next(new ErrorHandler("Product not found",404))
        }
        await product.deleteOne();
    res.status(200).json({
        success:true,
        message:"Product deleted successfully"
    })
});

//Create New Review or update the review
exports.createProductReview = catchAsyncErrors(async(req,res,next)=>{

    
    const {rating,comment,productId} = req.body;

    if (!productId) {
        return res.status(400).json({
            success: false,
            message: "Product ID is required"
        });
    }
    
    //Object
    const review = {
        user:req.user._id,
        name:req.user.name,
        rating:Number(rating),
        comment,
    };

    const product = await Product.findById(productId);

    //check if review already exist with this user
    const isReviewed = product.reviews.find((rev)=> rev.user.toString()=== req.user._id.toString()) 

    if(isReviewed){
        product.reviews.forEach(rev=>{
            if (rev.user.toString()===rev.user.id.toString())
            rev.rating = rating,
            rev.comment = comment
        })

    }
    else{
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    let avg=0;
     product.reviews.forEach((rev)=>{
        avg += rev.rating;
     })
     console.log(avg);
     product.ratings = avg / product.reviews.length;

     await product.save({validateBeforSave : false});
     res.status(200).json({
        success:true,
        message:"Review added successfully"

       })
});


//Get all reviews of a product
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    
    const product = await Product.findById(req.query.id);   
  
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
  
    res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
  });

// Delete review
exports.deleteReview = catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.findById(req.query.productId);
  
    if(!product){
        return next(new ErrorHandler("Product not found",404))
    }
  
    const reviews = product.reviews.filter(
        (rev)=>rev._id.toString()!==req.query.id.toString()
    )
  
    let avg=0;
     reviews.forEach((rev)=>{
        avg += rev.rating;
     })
     
    const ratings = avg / reviews.length;
  
     const numOfReviews = reviews.length;
  
     await Product.findByIdAndUpdate(req.query.productId,{
        reviews,
        ratings,
        numOfReviews
     },
    {
        new:true,
        runValidators:true,
        useFindAndModify: false,
    });
  
        res.status(200).json({
            success:true,
            
        })
  })