// Require Packages
// Cloudinary - Cloud Service that ables a developer to store images in a Cloud Db
const cloudinary = require("cloudinary").v2;

// A multer storage that connects to Cloudinary
const {CloudinaryStorage} = require("multer-storage-cloudinary");

// Multer - it's a middleware that handles uploaded files
const multer=require("multer");

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME ||"dkewk6ehh",
    api_key: process.CLOUDINARY_KEY || "411787387462784",
    api_secret: process.env.CLOUDINARY_SECRET || "1r7Jz-yFNwJYb8-fRfNI9dF6tZ4"
})

// Storage Configuration of Cloudinary
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        allowed_formats: ["jpg", "png"],
        folder: "navigation" // store inside a folder "navigation" on Cloudinary
    }
});


// Export Cloudinary Configuration
module.exports = multer({storage});