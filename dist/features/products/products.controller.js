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
exports.productsController = void 0;
const products_model_1 = __importDefault(require("./products.model"));
const products_validation_1 = require("./products.validation");
const createproduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        const validPaylod = products_validation_1.productsValidationSchema.parse(payload);
        const result = yield products_model_1.default.create(validPaylod);
        res.json({
            message: 'Product created successfully',
            success: true,
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error while creating a products',
            success: false,
            status: 404,
            error,
        });
    }
});
const getAllproducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, brand, category } = req.query;
        const filter = {};
        if (name)
            filter.name = name;
        if (brand)
            filter.brand = brand;
        if (category)
            filter.category = category;
        const products = yield products_model_1.default.find(filter);
        res.status(200).json({
            message: 'Products retrieved successfully',
            status: true,
            data: products,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error retrieving products',
            success: false,
            error,
        });
    }
});
const getSingleproduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.params.productId;
        // const validPaylod = productsValidationSchema.parse(payload)
        const result = yield products_model_1.default.findById(payload);
        res.json({
            message: 'Product retrieved  successfully',
            success: true,
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error while retrieved  a product',
            success: false,
            status: 500,
            error,
        });
    }
});
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.params.productId;
        const data = req.body;
        // const validPaylod = productsValidationSchema.parse(payload)
        const result = yield products_model_1.default.findByIdAndUpdate(payload, data, {
            new: true,
        });
        res.json({
            message: 'Product updated  successfully',
            success: true,
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error while updating  a product',
            success: false,
            status: 500,
            error,
        });
    }
});
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.params.productId;
        // const validPaylod = productsValidationSchema.parse(payload)
        const result = yield products_model_1.default.findByIdAndDelete(payload, {
            new: true,
        });
        res.json({
            message: 'Product deleted successfully',
            success: true,
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error while deleting  a product',
            success: false,
            status: 500,
            error,
        });
    }
});
exports.productsController = {
    createproduct,
    getAllproducts,
    getSingleproduct,
    updateProduct,
    deleteProduct,
};
