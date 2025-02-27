"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middleware/auth"));
const admin_controller_1 = require("./admin.controller");
const adminRouter = (0, express_1.Router)();
adminRouter.get('/users', (0, auth_1.default)('admin'), admin_controller_1.AdminController.getAllUsers);
adminRouter.patch('/users/:id', (0, auth_1.default)('admin'), admin_controller_1.AdminController.updateUser);
// adminRouter.patch('/users/:id', auth('admin'), AdminController.updateUser);
exports.default = adminRouter;
