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
exports.productsService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const AppError_1 = __importDefault(require("../../Error/AppError"));
const QueryBuilder_1 = __importDefault(require("../../utils/QueryBuilder"));
const UploadImageToCloudinary_1 = __importDefault(require("../../utils/UploadImageToCloudinary"));
const products_model_1 = require("./products.model");
const createProductIntoDb = (file, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (file) {
        const imageName = `${payload === null || payload === void 0 ? void 0 : payload.name}+${Date.now()}`;
        const path = file === null || file === void 0 ? void 0 : file.buffer;
        const uploadResponse = yield (0, UploadImageToCloudinary_1.default)(imageName, path);
        payload.profileImage = uploadResponse.url;
    }
    const result = yield products_model_1.productsModel.create(payload);
    return result;
});
const getAllProductsFromDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const SearchableFields = ['name', 'brand', 'category', 'description'];
    const productsQuery = new QueryBuilder_1.default(products_model_1.productsModel.find(), query)
        .search(SearchableFields)
        .pricefilter()
        .categoriesfilter()
        .sort()
        .paginate()
        .fields();
    const result = yield productsQuery.modelQuery;
    const meta = yield productsQuery.countTotal();
    const isFeatured = yield products_model_1.productsModel.find({ isFeatured: true });
    return {
        meta,
        isFeatured,
        result,
    };
});
const getSingleProductFromDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield products_model_1.productsModel.findById(payload);
    return product;
});
const getAllproductsForAdminFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield products_model_1.productsModel.find();
    return product;
});
const updateProductIntoDb = (payload, data, file) => __awaiter(void 0, void 0, void 0, function* () {
    if (file) {
        const imageName = `${data === null || data === void 0 ? void 0 : data.name}_${Date.now()}`;
        const fileBuffer = file === null || file === void 0 ? void 0 : file.buffer;
        try {
            const uploadResponse = yield (0, UploadImageToCloudinary_1.default)(imageName, fileBuffer);
            data.profileImage = uploadResponse.url;
        }
        catch (error) {
            throw new AppError_1.default(500, 'Failed to upload image');
        }
    }
    const product = yield products_model_1.productsModel.findByIdAndUpdate(payload, data, {
        new: true,
        runValidators: true,
    });
    return product;
});
const deleteProductIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const findProduct = yield products_model_1.productsModel.findById(payload);
    if (!findProduct) {
        throw new AppError_1.default(404, 'Product not found');
    }
    const product = yield products_model_1.productsModel.findByIdAndDelete(payload);
    return product;
});
exports.productsService = {
    createProductIntoDb,
    getAllProductsFromDb,
    getSingleProductFromDb,
    updateProductIntoDb,
    deleteProductIntoDb,
    getAllproductsForAdminFromDb
};
