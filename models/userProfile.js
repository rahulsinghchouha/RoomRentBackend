const mongoose = require("mongoose");

const userProfile = mongoose.Schema({
       name:{
        type:String,
        required:true,
        trim:true
       },
       email:{
        type:String,
        required:true,
        trim:true
       },
       phone:{
        type:Number,
        required:true,
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
        type:String,
        required:true
       },
       
})
module.exports = mongoose.model("userProfile",userProfile);