"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-undef */
const cloudinary_1 = __importDefault(require("cloudinary"));
const AppError_1 = __importDefault(require("../Error/AppError"));
const config_1 = __importDefault(require("../config"));
const stream_1 = require("stream");
cloudinary_1.default.v2.config({
    cloud_name: config_1.default.cloudinary_name,
    api_key: config_1.default.cloudinary_api_key,
    api_secret: config_1.default.cloudinary_api_secret,
});
const UploadImageToCloudinary = (imageName, fileBuffer) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary_1.default.v2.uploader.upload_stream({ public_id: imageName.trim() }, (error, result) => {
            if (error) {
                reject(new AppError_1.default(500, 'Error uploading image to Cloudinary'));
                return;
            }
            resolve({ message: 'Image uploaded successfully', url: (result === null || result === void 0 ? void 0 : result.secure_url) || "" });
        });
        const fileStream = stream_1.Readable.from(fileBuffer);
        fileStream.pipe(uploadStream);
    });
});
exports.default = UploadImageToCloudinary;
