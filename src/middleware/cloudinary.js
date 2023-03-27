import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { extname } from 'path';
import multer from "multer";

export const cloudinaryStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "byte-sizedBlogs",
        format: async (req, file) => extname(file.originalname).substring(1),
    },
});

export const upload = multer({ storage: cloudinaryStorage });
