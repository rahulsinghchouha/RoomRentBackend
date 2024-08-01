const mongoose = require("mongoose");
const products = require("./products");

const userProfile = mongoose.Schema({
       name:{
        type:String,
        required:true,
        trim:true
       },
       email:{
        type:String,        
        trim:true
       },
       phone:{
        type:Number,        
        trim:true,
       },
       password:{
        type:String,
        required:true,
        trim:true
       },
       accountType:{
        type:String,
        enum:["Admin","User"],
        required:true
       },
       image:{
        type:String
       },
       products:[{
              type:mongoose.Schema.Types.ObjectId,
              ref:"Products",
       }]
       
})
module.exports = mongoose.model("userProfile",userProfile);