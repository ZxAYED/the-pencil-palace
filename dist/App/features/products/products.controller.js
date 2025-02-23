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
const CatchAsync_1 = __importDefault(require("../../utils/CatchAsync"));
const products_service_1 = require("./products.service");
const createproduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_service_1.productsService.createProductIntoDb(req.file, req.body);
    res.status(200).json({
        message: 'Product created successfully',
        status: true,
        data: result,
    });
});
const getAllproducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_service_1.productsService.getAllProductsFromDb(req.query);
    res.status(200).json({
        message: 'Products retrieved successfully',
        status: true,
        data: result,
    });
});
const getAllproductsForAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_service_1.productsService.getAllproductsForAdminFromDb();
    res.status(200).json({
        message: 'Products retrieved successfully',
        status: true,
        data: result,
    });
});
const getSingleproduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_service_1.productsService.getSingleProductFromDb(req.params.productId);
    res.status(200).json({
        message: 'Product retrieved successfully',
        status: true,
        data: result,
    });
});
const updateProduct = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.params.productId;
    const data = req.body;
    const result = yield products_service_1.productsService.updateProductIntoDb(payload, data, req.file);
    res.status(200).json({
        message: 'Product updated  successfully',
        success: true,
        data: result,
    });
}));
const deleteProduct = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_service_1.productsService.deleteProductIntoDb(req.params.productId);
    res.status(200).json({
        message: 'Product deleted successfully',
        success: true,
        data: result,
    });
}));
exports.productsController = {
    createproduct,
    getAllproducts,
    getSingleproduct,
    updateProduct,
    deleteProduct,
    getAllproductsForAdmin
};
