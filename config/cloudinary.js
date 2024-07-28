const cloudinary = require("cloudinary").v2;
require("dotenv").config();

const cloudinaryconnect = () =>{
    try{
        cloudinary.config({
            cloud_name:process.env.cloud_name,
            api_key:process.env.api_key,
            api_secret:process.env.api_secret
        })
        console.log("Cloudinary connected succesfully");

    }
   
     catch (error) {
        console.log("error connecting CD"+error)
    }
}
module.exports = cloudinaryconnect;
