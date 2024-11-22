const cloudinary = require("../config/cloudinary.config"); // Assuming Cloudinary is configured
const streamifier = require('streamifier');
class FileUploader {
    // Static method to upload the buffer to Cloudinary
    static async uploadStream(buffer) {
        return new Promise(async (resolve, reject) => {
            try {
                const uploadStream = await cloudinary.uploader.upload_stream({
                    folder: 'uploads'
                }, (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(result);
                });
                streamifier.createReadStream(buffer).pipe(uploadStream);
            } catch (error) {
                // Handle and throw any errors that occur during the upload process
                throw error;
            }
        })
    }
}

module.exports = FileUploader;
