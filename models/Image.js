const mongoose = require("mongoose");

const Image = new mongoose.Schema({
    image:{
        type:String,
        required:true,
    }
})
module.exports = mongoose.model("Image",Image);