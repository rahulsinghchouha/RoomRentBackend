const express = require("express");
const router = express.Router();
const multer = require('multer');

// Set up Multer to store uploaded files
const storage = multer.memoryStorage(); // You can configure storage as needed
const upload = multer({ storage: storage });

const {addProducts,getProducts,deleteProduct,updateProduct, getProductsById} = require("../controllers/products");
const {checkUserPresent,isUser,isAdmin,auth} = require("../middleware/userauth");

router.post("/addproduct",auth,addProducts);
router.get("/getproducts",getProducts);
router.get("/getproductdetails/:productId",getProductsById);

module.exports=router;