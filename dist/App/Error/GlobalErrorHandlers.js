"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const mongoose_1 = __importDefault(require("mongoose"));
const AppError_1 = __importDefault(require("./AppError"));
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = "You have made a Huge Sin!";
    let errorSource = [{ path: '', message }];
    let stack = '';
    if (err instanceof zod_1.ZodError) {
        statusCode = 400;
        message = "Validation failed";
        errorSource = err.issues.map((issue) => ({
            path: issue.path.join('.') || '',
            message: issue.message,
        }));
        stack = err.stack || '';
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === 'CastError') {
        statusCode = 400;
        message = `Invalid ${err === null || err === void 0 ? void 0 : err.path}: ${err === null || err === void 0 ? void 0 : err.value}`;
        stack = err.stack || '';
    }
    else if (err instanceof mongoose_1.default.Error.ValidationError) {
        statusCode = 400;
        message = "Validation Error";
        errorSource = Object.values(err.errors).map((error) => ({
            path: (error === null || error === void 0 ? void 0 : error.path) || '',
            message: (error === null || error === void 0 ? void 0 : error.message) || 'Unknown Mongoose Validation error',
        }));
    }
    else if ((err === null || err === void 0 ? void 0 : err.code) === 11000) {
        statusCode = 400;
        const match = err.message.match(/"([^"]*)"/);
        const extractedMessage = match && match[1];
        errorSource = [{ path: '', message: `${extractedMessage} already exists` }];
        message = "Duplicate Key Error";
        stack = err.stack || '';
    }
    else if (err instanceof AppError_1.default) {
        statusCode = err.statusCode;
        message = err.message;
        errorSource = err.errorSources;
        stack = err.stack || '';
    }
    else if (err instanceof Error) {
        statusCode = 400;
        message = err.message;
        stack = err.stack || '';
    }
    return res.json({
        message,
        statusCode,
        success: false,
        errorSource,
        stack
    });
};
exports.default = globalErrorHandler;
