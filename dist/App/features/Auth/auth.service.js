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
exports.AuthService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../Error/AppError"));
const UploadImageToCloudinary_1 = __importDefault(require("../../utils/UploadImageToCloudinary"));
const auth_model_1 = __importDefault(require("./auth.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const nodeMailer_config_1 = __importDefault(require("../../utils/nodeMailer.config"));
const register = (file, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const UserEmail = email.toLowerCase();
    payload.email = UserEmail;
    const isUserExists = yield auth_model_1.default.findOne({ email });
    if (isUserExists) {
        throw new AppError_1.default(409, 'User already exists');
    }
    if (file) {
        const imageName = `${payload.name}-${payload.email}`;
        const uploadedImageUrl = yield (0, UploadImageToCloudinary_1.default)(imageName, file.buffer);
        payload.profileImage = uploadedImageUrl.url;
    }
    payload.password = yield bcryptjs_1.default.hash(password, Number(config_1.default.bcrypt_salt_rounds));
    payload.passwordChangedAt = new Date();
    payload.role = 'user';
    payload.status = 'active';
    payload.isDeleted = false;
    const user = yield auth_model_1.default.create(payload);
    return user;
});
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const UserEmail = email.toLowerCase();
    payload.email = UserEmail;
    const user = yield auth_model_1.default.findOne({ email: UserEmail });
    if (!user) {
        throw new AppError_1.default(404, 'User not found');
    }
    const isDeleted = user === null || user === void 0 ? void 0 : user.isDeleted;
    if (isDeleted) {
        throw new AppError_1.default(403, 'This user is deleted !');
    }
    const userStatus = user === null || user === void 0 ? void 0 : user.status;
    if (userStatus === 'blocked') {
        throw new AppError_1.default(403, 'This user is blocked ! !');
    }
    const isPasswordMatch = yield bcryptjs_1.default.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new AppError_1.default(401, 'Password is incorrect');
    }
    const jwtPayload = {
        userId: user === null || user === void 0 ? void 0 : user._id,
        role: user === null || user === void 0 ? void 0 : user.role,
        status: user === null || user === void 0 ? void 0 : user.status,
        isDeleted: user === null || user === void 0 ? void 0 : user.isDeleted,
    };
    const accessToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_access_secret, { expiresIn: 86400 });
    const refreshToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_refresh_secret, { expiresIn: 5184000 });
    return { user, accessToken, refreshToken };
});
const changePassword = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, oldPassword, newPassword } = payload;
    const UserEmail = email.toLowerCase();
    payload.email = UserEmail;
    const isUserExits = yield auth_model_1.default.findOne({ email: UserEmail });
    if (!isUserExits) {
        throw new AppError_1.default(404, 'User not found');
    }
    const isPasswordMatch = yield bcryptjs_1.default.compare(oldPassword, isUserExits.password);
    if (!isPasswordMatch) {
        throw new AppError_1.default(401, 'Password is incorrect');
    }
    const hashedPassword = yield bcryptjs_1.default.hash(newPassword, Number(config_1.default.bcrypt_salt_rounds));
    payload.password = hashedPassword;
    payload.passwordChangedAt = new Date();
    const user = yield auth_model_1.default.findByIdAndUpdate(isUserExits._id, payload, { new: true, runValidators: true });
    return user;
});
const requestPasswordReset = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = payload;
    const UserEmail = email.toLowerCase();
    const user = yield auth_model_1.default.findOne({ email: UserEmail });
    if (!user) {
        throw new AppError_1.default(404, 'User not found');
    }
    const resetToken = crypto_1.default.randomBytes(32).toString('hex');
    const resetTokenHash = crypto_1.default.createHash('sha256').update(resetToken).digest('hex');
    yield auth_model_1.default.findByIdAndUpdate(user._id, {
        passwordResetToken: resetTokenHash,
        passwordResetExpires: Date.now() + 60 * 60 * 1000,
        passwordChangedAt: new Date()
    });
    yield (0, nodeMailer_config_1.default)(user.email, resetToken);
    return { message: 'Password reset email sent' };
});
const resetPassword = (token, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { newPassword } = payload;
    const hashedToken = crypto_1.default.createHash('sha256').update(token).digest('hex');
    const user = yield auth_model_1.default.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() },
    });
    if (!user) {
        throw new AppError_1.default(400, 'Token is invalid or has expired');
    }
    user.password = yield bcryptjs_1.default.hash(newPassword, Number(config_1.default.bcrypt_salt_rounds));
    user.passwordResetToken = '';
    user.passwordResetExpires = '';
    yield user.save();
    return { message: 'Password reset successful' };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_refresh_secret);
    const { userId, role, status, isDeleted, iat } = decoded;
    const user = yield auth_model_1.default.findById(userId);
    if (!user) {
        throw new AppError_1.default(404, 'This user is not found !');
    }
    if (user.passwordChangedAt &&
        iat &&
        (user.passwordChangedAt.getTime() / 1000 < iat)) {
        throw new AppError_1.default(401, 'You are not authorized !');
    }
    const accessToken = jsonwebtoken_1.default.sign({ userId, role, status, isDeleted }, config_1.default.jwt_access_secret, { expiresIn: 86400 });
    return { accessToken };
});
exports.AuthService = {
    register, login, changePassword, requestPasswordReset, resetPassword, refreshToken
};
