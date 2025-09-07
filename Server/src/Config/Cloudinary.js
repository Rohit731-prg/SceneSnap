import { v2 as cloudniary } from "cloudinary";

cloudniary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SEC,
});

export default cloudniary;
