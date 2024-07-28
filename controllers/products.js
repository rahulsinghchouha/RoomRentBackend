const Product = require("../models/products");
const userProfile = require("../models/userProfile");
const formidable = require('formidable');
const uploadImageToCloudinary = require("../utils/imageUploader");
require("dotenv").config();

//convert formdata
const form = new formidable.IncomingForm();

const parseForm = (req) => {
    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) {
                reject(err);
            } else {
                resolve({ fields, files });
            }
        });
    });
};
//for check file supported

function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}

exports.addProducts = async (req, res) => {

    try {
        const { fields, files, err } = await parseForm(req);

        // Destructure form fields
        if (fields && files) {
            const { name, category, price, address, details, email } = fields;

            // Log fields and files
            // console.log('Name:', name);
            // console.log('Category:', category);
            // console.log('Price:', price);
            // console.log('Address:', address);
            // console.log('Details:', details);
            // console.log('Email:', email);
            // console.log('Files:', files);
            // console.log("img1", files?.img1 && files?.img1[0]);
            // console.log("img2", files?.img2 && files?.img2[0]);
            // console.log("img3", files?.img3 && files?.img3[0]);
            // console.log("img4", files?.img4 && files?.img4[0]);
            // console.log("img5", files?.img5 && files?.img5[0]);


            //step -1 validation


            if ((!name) || (!category) || (!price) || (!address) || (!details) || (!email)) {
                return res.status(404).json({
                    message: "insert all the data"
                })
            }
            //validata image
            if (!(files?.img1 || files?.img2 || files?.img3 || files?.img4 || files?.img5)) {
                return res.status(404).json({
                    message: "insert at least one image"
                })
            }
            // find User 

            const user = await userProfile.findOne({ email });
            if (!user) {
                return res.status(404).json({
                    message: "user not found"
                })
            }
            //upload image on cloudinary
            const img1 = files?.img1 && files?.img1[0] || "";
            const img2 = files?.img2 && files?.img2[0] || "";
            const img3 = files?.img3 && files?.img3[0] || "";
            const img4 = files?.img4 && files?.img4[0] || "";
            const img5 = files?.img5 && files?.img5[0] || "";

            //for check file type
            const supportedTypes = ["jpg", "jpeg", "png"];
            //for upload img1 
            if (img1) {
                const fileType = img1.originalFilename.split('.')[1].toLowerCase();

                if (!isFileTypeSupported(fileType, supportedTypes)) {
                    return res.status(400).json({
                        success: false,
                        message: "file format not supported",
                    })
                }
                try {
                    var imageUrl1 = await uploadImageToCloudinary(
                        img1,
                        process.env.FOLDER_NAME,
                    );
                }
                catch (err) {
                    return res.status(404).json({
                        message: "Image1 not uploaded",
                        error: err
                    })
                }

            }

            //for upload img2
            if (img2) {
                const fileType = img2.originalFilename.split('.')[1].toLowerCase();

                if (!isFileTypeSupported(fileType, supportedTypes)) {
                    return res.status(400).json({
                        success: false,
                        message: "file format not supported",
                    })
                }
                try {
                    var imageUrl2 = await uploadImageToCloudinary(
                        img2,
                        process.env.FOLDER_NAME,
                    );
                }
                catch (err) {
                    return res.status(404).json({
                        message: "Image2 not uploaded",
                        error: err
                    })
                }

            }

            //for upload img3 
            if (img3) {
                const fileType = img3.originalFilename.split('.')[1].toLowerCase();

                if (!isFileTypeSupported(fileType, supportedTypes)) {
                    return res.status(400).json({
                        success: false,
                        message: "file format not supported",
                    })
                }
                try {
                    var imageUrl3 = await uploadImageToCloudinary(
                        img3,
                        process.env.FOLDER_NAME,
                    );
                }
                catch (err) {
                    return res.status(404).json({
                        message: "Image3 not uploaded",
                        error: err
                    })
                }


            }

            //for upload img4 
            if (img4) {
                const fileType = img4.originalFilename.split('.')[1].toLowerCase();

                if (!isFileTypeSupported(fileType, supportedTypes)) {
                    return res.status(400).json({
                        success: false,
                        message: "file format not supported",
                    })
                }
                try {
                    var imageUrl4 = await uploadImageToCloudinary(
                        img4,
                        process.env.FOLDER_NAME,
                    );
                }
                catch (err) {
                    return res.status(404).json({
                        message: "Image4 not uploaded",
                        error: err
                    })
                }


            }

            //for upload img5 
            if (img5) {
                const fileType = img5.originalFilename.split('.')[1].toLowerCase();

                if (!isFileTypeSupported(fileType, supportedTypes)) {
                    return res.status(400).json({
                        success: false,
                        message: "file format not supported",
                    })
                }
                try {
                    var imageUrl5 = await uploadImageToCloudinary(
                        img5,
                        process.env.FOLDER_NAME,
                    );
                }
                catch (err) {
                    return res.status(404).json({
                        message: "Image5 not uploaded",
                        error: err
                    })
                }

            }
            //after this image we will 


            console.log("Image 1 url",imageUrl1);
            console.log("Image 2 url",imageUrl2);
            console.log("Image 3 url",imageUrl3);
            console.log("Image 4 url",imageUrl4);
            console.log("Image 5 url",imageUrl5);

            res.send('Form data received');
        }
        else {
            return res.status(404).json({
                message: "files and fiels not found",
                error: err
            })
        }

    }
    catch (error) {
        return res.status(404).json({
            message: "product not added please try again",
            error: error
        })
    }
};


exports.getProducts = async (req, res) => {


}
exports.deleteProduct = async (req, res) => {


}

exports.updateProduct = async (req, res) => {


}







