const cloudinary = require("cloudinary").v2;
const fs = require('fs');
const path = require('path');

const uploadImageToCloudinary = async (file,folder,height,width) =>
{
    // console.log("file,",file);
    // console.log(",folder,",folder);
    // console.log("height,",height);
    // console.log("width",width);
   // const options = {folder}
   try{
           const filePath = path.resolve(file.filepath);

   
            await fs.access(filePath, fs.constants.R_OK, (err) => {
             if (err) {
               console.error(`File not accessible: ${filePath}`);
               reject(new Error(`File not accessible: ${filePath}`));
               return;
             } })

           
             cloudinary.uploader.upload(
                  filePath,
                       {
                         resource_type: "image",
                         folder:folder,
                       },
                       {
                        retries: 2, // Number of retry attempts
                        factor: 2, // Exponential factor
                        minTimeout: 1000, // Minimum timeout between retries
                        onRetry: (err, attempt) => {
                          console.log(`Retry attempt ${attempt} failed: ${err.message}`);
                        },
                      },
                    
                  );
                  console.log('Upload successful:', result);
                  return result.secure_url;


                  // const result = await retry(
                  //   async () => {
                  //     return await cloudinary.uploader.upload(filePath, {
                  //       resource_type: 'image',
                  //       folder: folder,
                  //     });
                  //   },
                  //   {
                  //     retries: 5, // Number of retry attempts
                  //     factor: 2, // Exponential factor
                  //     minTimeout: 1000, // Minimum timeout between retries
                  //     onRetry: (err, attempt) => {
                  //       console.log(`Retry attempt ${attempt} failed: ${err.message}`);
                  //     },
                  //   }
                  // );
              
                  // console.log('Upload successful:', result);
                  // return result.secure_url;
              
                
   }
  


  catch(err)
  {
    return res.status(404).json({
      message:"image not uploaded",
      error:err
    })
  }


}
 module.exports = uploadImageToCloudinary;



// const fs = require('fs');
// const path = require('path');

// cloudinary.config({
//   cloud_name: 'your_cloud_name',
//   api_key: 'your_api_key',
//   api_secret: 'your_api_secret'
// });

// const uploadImageToCloudinary = (file, options) => {
//   return new Promise((resolve, reject) => {
//     const filePath = path.resolve(file.filepath);
    
//     fs.access(filePath, fs.constants.R_OK, (err) => {
//       if (err) {
//         reject(new Error(`File not accessible: ${filePath}`));
//         return;
//       }

//       cloudinary.uploader.upload(
//         filePath,
//         {
//           resource_type: "image",
//           folder: options.folder,
//           width: options.width,
//           height: options.height,
//           quality: options.quality
//         },
//         (error, result) => {
//           if (error) {
//             reject(error);
//           } else {
//             resolve(result);
//           }
//         }
//       );
//     });
//   });
// }
