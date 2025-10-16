const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME, // Read from .env file
  api_key: process.env.API_KEY, // Read from .env file
  api_secret: process.env.API_SECRET,
});

const storage = new multer.memoryStorage();

async function handleImageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return result;
}

const upload = multer({ storage });

module.exports = { upload, handleImageUploadUtil };
