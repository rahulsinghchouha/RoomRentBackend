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
    images:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Image",
    }
]

})

module.exports = mongoose.model("Products",addProduct);