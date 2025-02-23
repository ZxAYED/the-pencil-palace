"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AppError_1 = __importDefault(require("../../Error/AppError"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const multer_config_1 = __importDefault(require("../../utils/multer.config"));
const ValidateRequest_1 = __importDefault(require("../../utils/ValidateRequest"));
const products_controller_1 = require("./products.controller");
const products_validation_1 = require("./products.validation");
const productsRouter = (0, express_1.Router)();
productsRouter.post('/', (0, auth_1.default)('admin'), multer_config_1.default.single('profileImage'), (req, res, next) => {
    req.body.price = parseFloat(req.body.price);
    req.body.quantity = parseInt(req.body.quantity, 10);
    req.body.rating = parseFloat(req.body.rating);
    if (req.body.isFeatured) {
        req.body.isFeatured = req.body.isFeatured === 'true';
    }
    if (req.body.inStock) {
        req.body.inStock = req.body.inStock === 'true';
    }
    if (!req.body || !req.file) {
        return next(new AppError_1.default(400, 'Missing required fields or file'));
    }
    req.body.profileImage = req.file;
    next();
}, (0, ValidateRequest_1.default)(products_validation_1.createProductsValidationSchema), products_controller_1.productsController.createproduct);
productsRouter.get('/', products_controller_1.productsController.getAllproducts);
productsRouter.get('/admin', products_controller_1.productsController.getAllproductsForAdmin);
productsRouter.get('/:productId', products_controller_1.productsController.getSingleproduct);
productsRouter.patch('/:productId', (0, auth_1.default)('admin'), multer_config_1.default.single('profileImage'), (req, res, next) => {
    req.body.price = parseFloat(req.body.price);
    req.body.quantity = parseInt(req.body.quantity, 10);
    req.body.rating = parseFloat(req.body.rating);
    if (req.body.isFeatured) {
        req.body.isFeatured = req.body.isFeatured === 'true';
    }
    if (req.body.inStock) {
        req.body.inStock = req.body.inStock === 'true';
    }
    req.body.profileImage = req === null || req === void 0 ? void 0 : req.file;
    next();
}, (0, ValidateRequest_1.default)(products_validation_1.updateProductsValidationSchema), products_controller_1.productsController.updateProduct);
productsRouter.delete('/:productId', (0, auth_1.default)('admin'), products_controller_1.productsController.deleteProduct);
exports.default = productsRouter;
