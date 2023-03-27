import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { extname } from 'path';


export const cloudinaryStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "byte-sizedBlogs",
        format: async (req, file) => extname(file.originalname).substring(1),
    },
});