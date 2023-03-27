import multer from "multer";
import { cloudinaryStorage } from "./cloudinary.js";

export const upload = multer({ storage: cloudinaryStorage });