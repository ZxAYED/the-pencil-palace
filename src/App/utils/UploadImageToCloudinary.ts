import cloudinary from 'cloudinary';
import fs from 'fs';

import AppError from '../Error/AppError';
import config from '../config';

cloudinary.v2.config({
    cloud_name: config.cloudinary_name,
    api_key: config.cloudinary_api_key,
    api_secret: config.cloudinary_api_secret,
});

const UploadImageToCloudinary = async (imageName: string, filePath: string) => {
    console.log("File path received:", filePath);

    return new Promise<{ message: string; url: string }>((resolve, reject) => {
        if (!filePath) {
            reject(new AppError(400, "File path is missing"));
            return;
        }

        const uploadStream = cloudinary.v2.uploader.upload_stream(
            { public_id: imageName.trim() },
            (error, result) => {
                if (error) {
                    console.error('Cloudinary Upload Error:', error);
                    reject(new AppError(500, 'Error uploading image to Cloudinary'));
                    return;
                }

                if (result) {

                    fs.unlink(filePath, (err) => {
                        if (err) {
                            console.error('Error deleting file:', err);
                        } else {
                            console.log('Local file deleted successfully');
                        }
                    });

                    resolve({ message: 'Image uploaded successfully', url: result.secure_url });
                }
            }
        );


        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(uploadStream);
    });
};

export default UploadImageToCloudinary;
