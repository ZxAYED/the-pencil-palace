"use strict";
/* eslint-disable @typescript-eslint/no-unused-vars */
Object.defineProperty(exports, "__esModule", { value: true });
const NotFound = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: 'Route Not Found'
    });
};
exports.default = NotFound;
