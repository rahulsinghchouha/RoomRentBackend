const cloudinary = require("cloudinary").v2;
const fs = require('fs');
const path = require('path');

const uploadImageToCloudinary = async (file, folder, height, width) => {
  try {
    //check file path
    const filePath = path.resolve(file.filepath);

    //check file access
    fs.access(filePath, fs.constants.R_OK, (err) => {
      if (err) {
        console.error(`File not accessible: ${filePath}`);
        return;
      }})
    //for options
    const options = {
      resource_type: 'image',
      folder: folder,
      transformation: [{ width: width, height: height, crop: 'fill' }]
    };
    let retry = 2;

    //then upload code on cloudinary
    for (let attempt = 1; attempt <= retry; attempt++) {
      try {
        const result = await cloudinary.uploader.upload(filePath, options);
        return result.secure_url
      }
      catch (error) {
        if (attempt === retry) {
          console.log("Error cant upload try again", error);
          return;
          }
        
        console.log(`Retry attempt ${attempt} failed: ${error.message}`);
        // Delay before retrying (exponential backoff) itni der wait ke baad agian start
        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempt - 1)));
        }
      }
    }

  
  catch (err) {
    console.error('Unexpected error:', err);
    return;
  
  }
}
module.exports = uploadImageToCloudinary;