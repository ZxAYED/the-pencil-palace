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
const CatchAsync_1 = __importDefault(require("../../utils/CatchAsync"));
const orders_service_1 = require("./orders.service");
const addToCart = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield orders_service_1.orderService.addToCartIntoDb(req.body);
    res.status(200).json({
        message: 'Item  has been added to cart',
        success: true,
        status: 200,
        data: result,
    });
}));
const createOrder = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield orders_service_1.orderService.createOrderIntoDb(req.body);
    res.status(200).json({
        message: 'Order  has been placed',
        success: true,
        status: 200,
        data: result,
    });
}));
const getAllOrdersOfUser = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield orders_service_1.orderService.getAllOrdersOfUserIntoDb(req.params.orderId);
    res.status(200).json({
        message: 'Order fetched successfully',
        success: true,
        status: 200,
        data: result,
    });
}));
const getSingleOrdersOfUser = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield orders_service_1.orderService.getSingleOrdersOfUserFromDb(req.params.orderId);
    res.status(200).json({
        message: 'Order fetched successfully',
        success: true,
        status: 200,
        data: result,
    });
}));
const getAllOrdersOfUserDashboard = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield orders_service_1.orderService.getAllOrdersOfUserDashboardIntoDb(req.params.email);
    res.status(200).json({
        message: 'All Orders fetched successfully',
        success: true,
        status: 200,
        data: result,
    });
}));
const getAllOrders = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield orders_service_1.orderService.getAllOrdersIntoDb();
    res.status(200).json({
        message: 'All Orders fetched successfully',
        success: true,
        status: 200,
        data: result,
    });
}));
const removeItemFromCart = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield orders_service_1.orderService.removeItemFromCart(req.params.id);
    res.status(200).json({
        message: 'Order cancelled successfully',
        success: true,
        status: 200,
        data: result,
    });
}));
const deleteOrder = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield orders_service_1.orderService.deleteOrderFromDb(req.params.id);
    res.status(200).json({
        message: 'Order cancelled successfully',
        success: true,
        status: 200,
        data: result,
    });
}));
const generateRevenue = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield orders_service_1.orderService.generateRevenueFromDb();
    res.status(200).json({
        message: 'Revenue calculated successfully',
        success: true,
        status: 200,
        data: result,
    });
}));
const getSingleUserCart = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield orders_service_1.orderService.getSingleUserCartFromDb(req.params.email);
    res.status(200).json({
        message: 'Order retrieved successfully',
        success: true,
        status: 200,
        data: result,
    });
}));
const getSingleOrderCart = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield orders_service_1.orderService.getSingleOrderFromDb(req.params.orderId);
    res.status(200).json({
        message: 'Cart retrieved successfully',
        success: true,
        status: 200,
        data: result,
    });
}));
const makePayment = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield orders_service_1.orderService.makePaymentIntoDb(req.body, req.ip);
    res.status(200).json({
        message: 'Payment successful',
        success: true,
        status: 200,
        data: result,
    });
}));
const verifyPayment = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield orders_service_1.orderService.verifyPaymentIntoDb(req.query.order_id);
    res.status(200).json({
        message: 'Payment verified successfully',
        success: true,
        data: result,
    });
}));
exports.orderController = {
    addToCart, getAllOrdersOfUserDashboard,
    generateRevenue, createOrder, getSingleOrderCart, getAllOrdersOfUser, getSingleUserCart, removeItemFromCart, makePayment, verifyPayment, getAllOrders, deleteOrder, getSingleOrdersOfUser
};
