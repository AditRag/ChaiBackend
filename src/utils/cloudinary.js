import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs';

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
})



const uploadOnCloudinary = async (localPFilePath) => {
    try {
        if (!localPFilePath) return null;
        // upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localPFilePath, {
            folder: "chaiAurBackend",
            resource_type: "auto"
        })
        // file has been uploaded successfully
        //console.log("File is uploaded on cloudinary", response.url);
        fs.unlinkSync(localPFilePath)
        return response;
        
        } catch (error) {
            console.error("Cloudinary upload failed:", error);
            fs.unlinkSync(localPFilePath) 
            // remove the locally stored file as the upload operation got failed
            return null;
        }
    }


export {uploadOnCloudinary}
