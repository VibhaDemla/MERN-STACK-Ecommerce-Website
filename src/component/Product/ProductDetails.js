import React, { Fragment ,useEffect} from 'react';
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector,useDispatch } from 'react-redux';
import { clearErrors, getProductDetails } from '../../actions/productAction';
import { useParams } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";
import  ReviewCard from "./ReviewCard.js";
import Loader from '../layout/Loader/Loader.js';
import { useAlert } from 'react-alert';

const ProductDetails = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const { id } = useParams();  // Extract the 'id' parameter from the URL

     // Extract product, error, and loading state from the Redux store
    const {product,error,loading} = useSelector(
        (state) => state.productDetails 
    )

    useEffect(() => {
      if(error){
        alert.error(error)
        dispatch(clearErrors)
      }

    if (id) {
      dispatch(getProductDetails(id));
    }
  }, [dispatch, id,alert,error]);

  const options = {
    edit: false,
    color:"rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth <600 ? 20:25,
    value: product.ratings,
    isHalf: true,

}
    
  return (
   <Fragment>
    {loading ? <Loader/> :
      <Fragment>
      <div className="ProductDetails">
        
            <div>
                <Carousel>
                  {product.images && product.images.map((item, index) => (
                    <img
                      className="CarouselImage" 
                      key={item.url}
                      src={item.url}
                      alt={`${index} Slide`}
                      
                    />
                  ))}
                </Carousel>
            </div>
  
            <div>
                  <div className='detailsBlock-1'>
                    <h2>{product.name}</h2>
                    <p>Product # {product._id}</p>
                  </div>
  
                  <div className='detailsBlock-2'>
                    <ReactStars {...options} />
                    <span>
                      ({product.numOfReviews} Reviews)
                    </span>
                  </div>
  
              <div className='detailsBlock-3'>
                  <h1>{`Rs${product.price}`}</h1>
                      <div className='detailsBlock-3-1'>
                              <div className='detailsBlock-3-1-1'>
                                  <button>-</button>
                                  <input value="1" type="number" />
                                  <button>+</button>
                              </div>{" "}
                          <button>Add to Cart</button>
                      </div>
                  <p>
                    Status:{" "}
                    <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                        {product.Stock < 1 ? "OutOfStock" : "InStock"}
                    </b>
                  </p>
              </div>
  
              <div className='detailsBlock-4'>
                Description : <p>{product.description}</p>
              </div>
  
              <button className='submitReview'>Submit Review</button>
          </div>
      </div>
  
      <h3 className='reviewsHeading'>REVIEWS</h3>
  
      {product.reviews && product.reviews[0] ? (
        <div className='reviews'>
          {product.reviews && product.reviews.map((review) => 
            <ReviewCard review={review} />)}
        </div>
      ): (
        <p className='noReviews'>No Reviews Yet</p>
      )}
      </Fragment>}
   </Fragment>
    
  );
};

export default ProductDetails
