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
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../config"));
const sendResetPasswordEmail = (email, resetToken) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        service: 'gmail',
        auth: {
            user: config_1.default.appGmail,
            pass: config_1.default.appPassword,
        },
    });
    const resetURL = `${config_1.default.base_url}/reset-password?token=${resetToken}`;
    const mailOptions = {
        from: '"Support Team" <your-email@gmail.com>',
        to: email,
        subject: 'Password Reset Request',
        html: `
      <h3>Password Reset From The Pencil Palace</h3>
      <p>Please click the link below to reset your password:</p>
      <a href="${resetURL}">Reset Password</a>
      <p>This link will expire in 1 hour.</p>
    `,
    };
    yield transporter.sendMail(mailOptions);
    return { message: `Password reset email sent to ${email}` };
});
exports.default = sendResetPasswordEmail;
