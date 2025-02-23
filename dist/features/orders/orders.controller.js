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
exports.orderController = void 0;
const orders_model_1 = __importDefault(require("./orders.model"));
const products_model_1 = __importDefault(require("../products/products.model"));
const createOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        const productData = yield products_model_1.default.findById(payload.product);
        if (!productData) {
            res.status(404).json({
                message: 'Product not found',
                success: false,
            });
            return;
        }
        if (!productData.inStock || productData.quantity < req.body.quantity) {
            res.status(400).json({
                message: 'Insufficient stock',
                success: false,
            });
            return;
        }
        const quantity = productData.quantity - payload.quantity;
        const updatedData = {
            quantity: quantity,
            inStock: quantity > 0,
        };
        yield products_model_1.default.findByIdAndUpdate(payload.product, updatedData);
        const result = yield orders_model_1.default.create(payload);
        res.status(200).json({
            message: 'Order has been placed',
            success: true,
            status: 200,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const generateRevenue = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield orders_model_1.default.aggregate([
            {
                $addFields: {
                    total: { $multiply: ['$totalPrice', '$quantity'] },
                },
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: '$total' },
                },
            },
        ]);
        if (result.length > 0) {
            const totalRevenue = result[0].totalRevenue;
            res.status(200).json({
                message: 'Revenue calculated successfully',
                success: true,
                data: { totalRevenue },
            });
        }
        else {
            res.status(200).json({
                message: 'No revenue data found',
                success: true,
                data: { totalRevenue: 0 },
            });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.orderController = {
    createOrder,
    generateRevenue,
};
