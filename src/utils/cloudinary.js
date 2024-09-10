import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME , 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary=async(localFilePath)=>{
    try {
        if(!localFilePath){
            return null
        }

        const response=await cloudinary.uploader.upload(
            localFilePath,{
            resource_type:"auto"
        })
        console.log("file uploaded!");

        //once the file is uploaded, we'll remove it from the server storage
        fs.unlinkSync(localFilePath)
        return response
    } catch (error) {
        //if uploading on cloudinary fails, we will remove that file from our server storage as well, that is from her itself
        fs.unlinkSync(localFilePath)
        return null
    }
}

export {uploadOnCloudinary}