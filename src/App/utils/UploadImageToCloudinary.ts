import cloudinary from 'cloudinary';
import config from '../config';
import AppError from '../Error/AppError';

cloudinary.v2.config({
    cloud_name: config.cloudinary_name,
    api_key: config.cloudinary_api_key,
    api_secret: config.cloudinary_api_secret,
});

const UploadImageToCloudinary = async (imageName: string, file: any) => {
    return new Promise<{ message: string; url: string }>((resolve, reject) => {
        const uploadStream = cloudinary.v2.uploader.upload_stream(
            { public_id: imageName.trim() },
            (error, result) => {
                if (error) {
                    console.log(error);
                    reject(new AppError(500, 'Error uploading image'));
                }
                if (result) {
                    resolve({ message: 'Image uploaded successfully', url: result?.secure_url });
                }
            }
        );


        uploadStream.end(file);
    });
};

export default UploadImageToCloudinary;
