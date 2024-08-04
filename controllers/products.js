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
        const { fields, files, err } = await parseForm(req); //form se files and fields ko alag alag krke de dega v err hoga to vo bhi de dega

        // Destructure form fields
        if (fields && files) {
            const { name, category, price, address, details, email } = fields;

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
            const imageUrls = [imageUrl1, imageUrl2, imageUrl3, imageUrl4, imageUrl5];

            // Filter out undefined and empty strings
            const images = imageUrls.filter(url => url !== undefined && url !== '');

            //console.log("=====>",name[0], category[0], price[0], address[0], details[0], email[0])

            //create object of product

            const product = new Product({
                name: name[0],
                category: category[0],
                price: price[0],
                address: address[0],
                details: details[0],
                images: [...images]
            })
            //now we save this object 
            try {
                const newProduct = await product.save();

                //now we save this product into user schema

                const productUser = await userProfile.findByIdAndUpdate(
                    { _id: user._id },
                    {
                        $push: {
                            products: newProduct._id,
                        }
                    },
                    { new: true },
                )
              //  console.log("Product userr==>", productUser);
            }
            catch (error) {
               // console.log("Product save error", error)
                res.status(400).json({
                    success: false,
                    message: "Product was not saved",
                });
            }

            // Return the new course and a success message
            res.status(200).json({
                success: true,
                message: "Product Saved Successfully",
            });

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

    //fetch data from Products model return products

    try {
        const products = await Product.find();
        if (products) {
            return res.status(200).json({
                success: true,
                message: "Prducts get succesfully",
                products: products
            })
        }
        else {
            return res.status(400).json({
                success: false,
                message: "Produc not get"
            })
        }
    }
    catch (error) {
        //console.log("error");
        return res.status(404).json({
            success: false,
            message: "Produc not fetched"
        })
    }



}
exports.deleteProduct = async (req, res) => {


}

exports.updateProduct = async (req, res) => {


}

exports.getProductsById = async (req, res) => {

}







