import config from "../../config";
import AppError from "../../Error/AppError";
import UploadImageToCloudinary from "../../utils/UploadImageToCloudinary";
import { IAuth, IAuthRegister } from "./auth.interface";
import userModel from "./auth.model";
import bcrypt from 'bcryptjs';
import jwt, { JwtPayload } from 'jsonwebtoken';





const register = async (file: any, payload: IAuthRegister) => {

    const { email, password } = payload;
    const isUserExits = await userModel.findOne({ email });

    if (file) {
        const imageName = `${payload?.name}+${payload.email}`;
        const path = file?.path;
        const uploadResponse = await UploadImageToCloudinary(imageName, path);
        payload.profileImage = uploadResponse.url;
    }

    if (isUserExits) {
        throw new AppError(409, 'User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));
    payload.password = hashedPassword;
    payload.passwordChangedAt = new Date();
    payload.role = 'user';
    payload.status = 'active';
    payload.isDeleted = false;


    const user = await userModel.create(payload);
    return user;
};

export const AuthController = {
    register,
};

const getAllUsersFromDB = async () => {
    const users = await userModel.find();
    return users;
}

const login = async (payload: IAuth) => {
    const { email, password } = payload;
    const user = await userModel.findOne({ email });
    if (!user) {
        throw new AppError(404, 'User not found');
    }

    const isDeleted = user?.isDeleted;
    if (isDeleted) {
        throw new AppError(403, 'This user is deleted !');
    }
    const userStatus = user?.status;
    if (userStatus === 'blocked') {
        throw new AppError(403, 'This user is blocked ! !');
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new AppError(401, 'Password is incorrect');
    }
    const jwtPayload = {
        userId: user?._id,
        role: user?.role,
        status: user?.status,
        isDeleted: user?.isDeleted,

    } as JwtPayload

    const accessToken = jwt.sign(jwtPayload,
        (config.jwt_access_secret as string),
        { expiresIn: 86400 });

    const refreshToken = jwt.sign(jwtPayload,
        (config.jwt_refresh_secret as string),
        { expiresIn: 5184000 });

    return { user, accessToken, refreshToken };
}

const updateUserIntoDb = async (userId: string, payload: Partial<IAuthRegister>) => {
    const isUserExits = await userModel.findOne({ email: payload.email });
    if (!isUserExits) {
        throw new AppError(404, 'User not found');
    }
    if (isUserExits.isDeleted) {
        throw new AppError(403, 'This user is already deleted !');
    }
    if (isUserExits.status === 'blocked') {
        throw new AppError(403, 'This user is already blocked !');
    }
    if (payload.role || payload.isDeleted && isUserExits.role === 'user') {
        throw new AppError(403, 'You are not authorized to update this user !');

    }
    const user = await userModel.findByIdAndUpdate(userId, payload, { new: true, runValidators: true });
    return user;
}

export const AuthService = {
    register, login, getAllUsersFromDB, updateUserIntoDb
}   
