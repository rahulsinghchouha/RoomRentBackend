const mongoose = require("mongoose");

const addProduct = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,

    },
    address:{
        type:String,
        required:true,        
    },
    details:{
        type:String,
        required:true,
        
    },
    images:
        [
            {
            type:String,
            }
        ]


})

module.exports = mongoose.model("Products",addProduct);