const express = require("express");
const { getAllProducts,createProduct ,updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteReview} = require("../controllers/productController");
const router = express.Router();
const {isAuthenticatedUser,authorizeRoles} = require("../middleware/auth")

router.route("/products").get(getAllProducts);

router.route("/admin/product/new").post(isAuthenticatedUser,authorizeRoles("admin"),createProduct);

router
    .route("/admin/product/:id")
    .delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProduct)
    .put(isAuthenticatedUser,authorizeRoles("admin"),updateProduct);;


router.route("/product/:id").get(getProductDetails)

router.route("/review").put(isAuthenticatedUser,createProductReview);

router.route("/reviews").get(getProductReviews).delete(isAuthenticatedUser,authorizeRoles("admin"),deleteReview);

module.exports= router