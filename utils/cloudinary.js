import dotenv from "dotenv"
dotenv.config()
import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
})

const UploadFile = async(LocalFilePath) =>{
    try{
        if(!LocalFilePath){
            throw new Error("LocalFilePath is missing")
        }

        const response = await cloudinary.uploader.upload(LocalFilePath, {
            resource_type: "auto"
        })

        //Unlink the local file after successful upload 
        fs.unlinkSync(LocalFilePath);
         return response;
    } catch (error) {
    console.error("Error during upload:", error);

        try {
      // Attempt to unlink the file again if it hasn't been unlinked yet
      if (fs.existsSync(LocalFilePath)) {
        fs.unlinkSync(LocalFilePath);
        console.log("File unlinked successfully");
      }
    } catch (unlinkError) {
      console.error("Error unlinking file:", unlinkError);
    }

    throw error;
  }
}

export { UploadFile }