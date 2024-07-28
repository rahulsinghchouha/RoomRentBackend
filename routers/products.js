const express = require("express");
const router = express.Router();
const multer = require('multer');

// Set up Multer to store uploaded files
const storage = multer.memoryStorage(); // You can configure storage as needed
const upload = multer({ storage: storage });

const {addProducts,getProducts,deleteProduct,updateProduct} = require("../controllers/products");

router.post("/addproduct",addProducts);


module.exports=router;