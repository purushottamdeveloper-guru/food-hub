import { v2 as cloudinary } from "cloudinary"
import fs from "fs"

const uploadOnCloudinary = async (file) => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        })

        console.log("Cloudinary upload started...")

        const result = await cloudinary.uploader.upload(file, {
            folder: "foodhub"
        })

        console.log("Cloudinary upload successful:", result.secure_url)

        if (fs.existsSync(file)) {
            fs.unlinkSync(file)
        }

        return result.secure_url

    } catch (error) {
        console.log("CLOUDINARY ERROR:", error)

        if (fs.existsSync(file)) {
            fs.unlinkSync(file)
        }

        throw error
    }
}

export default uploadOnCloudinary