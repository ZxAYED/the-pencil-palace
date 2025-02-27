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
exports.AuthController = void 0;
const CatchAsync_1 = __importDefault(require("../../utils/CatchAsync"));
const auth_service_1 = require("./auth.service");
const register = (0, CatchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.AuthService.register(req.file, req.body);
    res.status(200).json({
        success: true,
        message: 'User created successfully',
        data: result
    });
}));
const login = (0, CatchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.AuthService.login(req.body);
    res.status(200).json({
        success: true,
        message: 'User logged in successfully',
        data: result
    });
}));
const changePassword = (0, CatchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.AuthService.changePassword(req.body);
    res.status(200).json({
        success: true,
        message: 'Password updated successfully',
        data: result
    });
}));
const requestPasswordReset = (0, CatchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.AuthService.requestPasswordReset(req.body);
    res.status(200).json({
        success: true,
        message: 'Password reset link  sent  to email successfully',
        data: result
    });
}));
const resetPassword = (0, CatchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.AuthService.resetPassword(req.query.token, req.body);
    res.status(200).json({
        success: true,
        message: 'Password reset successfully',
        data: result
    });
}));
const refreshToken = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.AuthService.refreshToken(req.body.token);
    res.status(200).json({
        message: 'Token refreshed successfully',
        success: true,
        status: 200,
        data: result,
    });
}));
exports.AuthController = {
    register,
    login, changePassword, requestPasswordReset, resetPassword, refreshToken
};
