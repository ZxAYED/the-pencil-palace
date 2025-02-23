"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenValidation = exports.loginUserValidation = exports.forgotPasswordValidation = exports.updateUserValidation = exports.createUserValidation = void 0;
const zod_1 = require("zod");
exports.createUserValidation = zod_1.z.object({
    name: zod_1.z.string({ message: "Name is required" }),
    email: zod_1.z.string().email({ message: "Invalid email format" }),
    password: zod_1.z.string().min(6, { message: "Password must be at least 6 characters" }),
    role: zod_1.z.enum(["admin", "user"], { message: "Role must be either 'admin' or 'user'" }).default('user'),
    status: zod_1.z.enum(["active", "blocked"], { message: "Status must be 'active' or 'blocked'" }).default('active'),
    address: zod_1.z.string({ message: "Address is required" }),
    phone: zod_1.z.string({
        message: "Invalid phone number. It must be a valid Bangladeshi number from Airtel, Robi, Banglalink, Teletalk, or Grameenphone.",
    }),
    profileImage: zod_1.z.object({
        filename: zod_1.z.string().optional(),
        path: zod_1.z.string().optional(),
        mimetype: zod_1.z.string().optional(),
    }).optional(),
    isPasswordMatch: zod_1.z.string().min(6, { message: "Password must be at least 6 characters" }).optional(),
});
exports.updateUserValidation = zod_1.z.object({
    name: zod_1.z.string({ message: "Name cannot be empty" }).optional(),
    email: zod_1.z.string().email({ message: "Invalid email format" }).optional(),
    password: zod_1.z.string().min(6, { message: "Password must be at least 6 characters" }).optional(),
    role: zod_1.z.enum(["admin", "user"], { message: "Invalid role" }).optional(),
    status: zod_1.z.enum(["active", "blocked"], { message: "Invalid status" }).optional(),
    address: zod_1.z.string({ message: "Address cannot be empty" }).optional(),
    phone: zod_1.z.string({
        message: "Invalid phone number. It must be a valid Bangladeshi number from Airtel, Robi, Banglalink, Teletalk, or Grameenphone.",
    }).optional(),
    profileImage: zod_1.z.object({
        filename: zod_1.z.string().optional(),
        path: zod_1.z.string().optional(),
        mimetype: zod_1.z.string().optional(),
    }).optional(),
    isPasswordMatch: zod_1.z.string().min(6, { message: "Password must be at least 6 characters" }).optional(),
});
exports.forgotPasswordValidation = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Invalid email format" }),
    oldPassword: zod_1.z.string().min(6, { message: "Password must be at least 6 characters" }),
    newPassword: zod_1.z.string().min(6, { message: "Password must be at least 6 characters" }),
});
exports.loginUserValidation = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Invalid email format" }),
    password: zod_1.z.string().min(6, { message: "Password must be at least 6 characters" }),
});
exports.refreshTokenValidation = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: 'Refresh token is required!',
        }),
    }),
});
