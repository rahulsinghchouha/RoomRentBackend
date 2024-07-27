const mongoose = require("mongoose");

const userProfile = mongoose.Schema({
       name:{
        type:String,
        required:true,
        default: 'default@example.com',
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
       
})
module.exports = mongoose.model("userProfile",userProfile);