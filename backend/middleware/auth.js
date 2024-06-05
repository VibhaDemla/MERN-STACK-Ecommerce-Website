const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");


exports.isAuthenticatedUser = catchAsyncErrors( async (req,res,next)=>{

    //we stored token in cookie at the time of login.
    const { token } = req.cookies;


    if(!token){
        return next(new ErrorHandler("Please login to access this resourse",401))
    }

    
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    //console.log('Decoded Data:', decodedData); // Debug log

    req.user = await User.findById(decodedData.id);

    if (!req.user) {
        return next(new ErrorHandler("User not found", 404));
    }

    next();

});




exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return next(new ErrorHandler("User data not found", 500));
        }

        //console.log(`User role: ${req.user.role}`); // Debug log
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`, 403));
        }

        next();
    };
};
