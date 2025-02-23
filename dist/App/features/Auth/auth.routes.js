"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const auth_validation_1 = require("./auth.validation");
const ValidateRequest_1 = __importDefault(require("../../utils/ValidateRequest"));
const multer_config_1 = __importDefault(require("../../utils/multer.config"));
const AppError_1 = __importDefault(require("../../Error/AppError"));
const authRouter = (0, express_1.Router)();
authRouter.post('/register', multer_config_1.default.single('profileImage'), (req, res, next) => {
    req.body.profileImage = req === null || req === void 0 ? void 0 : req.file;
    if (!req.body || !req.file) {
        throw new AppError_1.default(400, 'Missing required fields or file');
    }
    next();
}, (0, ValidateRequest_1.default)(auth_validation_1.createUserValidation), auth_controller_1.AuthController.register);
authRouter.post('/login', (0, ValidateRequest_1.default)(auth_validation_1.loginUserValidation), auth_controller_1.AuthController.login);
authRouter.post('/change-password', (0, ValidateRequest_1.default)(auth_validation_1.forgotPasswordValidation), auth_controller_1.AuthController.changePassword);
authRouter.post('/request-password-reset', auth_controller_1.AuthController.requestPasswordReset);
authRouter.post('/reset-password', auth_controller_1.AuthController.resetPassword);
authRouter.post('/refresh-token', (0, ValidateRequest_1.default)(auth_validation_1.refreshTokenValidation), auth_controller_1.AuthController.refreshToken);
exports.default = authRouter;
