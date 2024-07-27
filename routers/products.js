const express = require("express");
const router = express.Router();

const {addProducts,getProducts,deleteProduct,updateProduct} = require("../controllers/products");

router.post("/addproduct",addProducts);


module.exports=router;