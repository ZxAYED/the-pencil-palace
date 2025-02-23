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
exports.orderService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const mongoose_1 = __importDefault(require("mongoose"));
const AppError_1 = __importDefault(require("../../Error/AppError"));
const products_model_1 = require("../products/products.model");
const order_utils_1 = require("./order.utils");
const orders_model_1 = require("./orders.model");
const addToCartIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = payload.products.product;
    const productDataList = yield products_model_1.productsModel.find({ _id: productId });
    if (!productDataList.length) {
        return {
            status: 404,
            message: 'Product not found',
            success: false,
        };
    }
    const insufficientStock = productDataList.filter((requestedProduct) => {
        const productData = productDataList.find((product) => product._id === requestedProduct._id);
        if (!productData || !productData.inStock) {
            return true;
        }
        if (requestedProduct.quantity > productData.quantity) {
            return true;
        }
        return false;
    });
    if (insufficientStock.length > 0) {
        return {
            status: 400,
            message: `Insufficient stock for product(s): ${insufficientStock.map(item => item.name).join(', ')}`,
            success: false,
        };
    }
    productDataList.map((productData) => {
        const cartProduct = payload.products.product === productData._id;
        if (cartProduct) {
            const updatedQuantity = productData.quantity - payload.products.quantity;
            return products_model_1.productsModel.findByIdAndUpdate(productData._id, {
                quantity: updatedQuantity,
                inStock: updatedQuantity > 0,
            });
        }
    });
    const result = yield orders_model_1.Models.CartModel.create(payload);
    return result;
});
const generateRevenueFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield orders_model_1.Models.CartModel.aggregate([
        {
            $addFields: {
                total: { $multiply: ["$totalPrice", "$products.quantity"] },
            },
        },
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: "$total" },
            },
        },
    ]);
    if (result.length > 0) {
        return {
            message: "Revenue calculated successfully",
            success: true,
            data: { totalRevenue: result[0].totalRevenue },
        };
    }
    else {
        return {
            message: "No revenue data found",
            success: true,
            data: { totalRevenue: 0 },
        };
    }
});
const getSingleUserCartFromDb = (userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield orders_model_1.Models.CartModel.find({ email: userEmail }).populate('products.product').populate('userId');
    return result;
});
const getSingleOrderFromDb = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield orders_model_1.Models.OrderModel.findById(orderId).populate('products');
    return result;
});
const getSingleOrdersOfUserFromDb = (OrderId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield orders_model_1.Models.OrderModel.findOne({ OrderId: OrderId }).populate('products');
    return result;
});
const getAllOrdersOfUserDashboardIntoDb = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield orders_model_1.Models.OrderModel.find({ userEmail: email }).populate('products');
    return result;
});
const createOrderIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userEmail = payload.userEmail;
    const allCarts = yield orders_model_1.Models.CartModel.find({ email: userEmail });
    let products = [];
    allCarts.forEach(item => products.push(item.products.product._id));
    const orderData = {
        userEmail: userEmail,
        totalPrice: payload.totalPrice,
        quantity: payload.quantity,
        products: products,
    };
    const result = yield orders_model_1.Models.OrderModel.create(orderData);
    return result;
});
const makePaymentIntoDb = (payload, client) => __awaiter(void 0, void 0, void 0, function* () {
    const clientIp = client === '::1' ? '127.0.0.1' : client;
    const surjoPayload = Object.assign(Object.assign({}, payload), { client_ip: clientIp });
    const payment = yield (0, order_utils_1.makePayment)(surjoPayload);
    if (payment === null || payment === void 0 ? void 0 : payment.transactionStatus) {
        yield orders_model_1.Models.OrderModel.findByIdAndUpdate(payload.order_id, {
            payment: {
                status: 'Initiated',
            }, OrderId: payment.sp_order_id
        }, { new: true, runValidators: true });
    }
    if (payment === null || payment === void 0 ? void 0 : payment.transactionStatus) {
        yield orders_model_1.Models.OrderModel.updateOne({
            transaction: {
                id: payment.sp_order_id,
                transactionStatus: payment.transactionStatus,
            },
        });
    }
    if ((payment === null || payment === void 0 ? void 0 : payment.transactionStatus) === 'Completed') {
        yield orders_model_1.Models.OrderModel.findByIdAndUpdate(payload.order_id, { paymentStatus: 'Initiated' });
    }
    return payment.checkout_url;
});
const verifyPaymentIntoDb = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const result = yield (0, order_utils_1.verifyPayment)(orderId);
        yield orders_model_1.Models.OrderModel.updateOne({ OrderId: (_a = result === null || result === void 0 ? void 0 : result[0]) === null || _a === void 0 ? void 0 : _a.order_id }, {
            payment: {
                status: ((_b = result === null || result === void 0 ? void 0 : result[0]) === null || _b === void 0 ? void 0 : _b.bank_status) === 'Success' ? "Paid" : ((_c = result === null || result === void 0 ? void 0 : result[0]) === null || _c === void 0 ? void 0 : _c.bank_status) === 'Failed' ? "Pending" : ((_d = result === null || result === void 0 ? void 0 : result[0]) === null || _d === void 0 ? void 0 : _d.bank_status) === 'Cancel' ? "Cancelled" : "Initiated",
                orderId,
                sp_code: (_e = result === null || result === void 0 ? void 0 : result[0]) === null || _e === void 0 ? void 0 : _e.sp_code,
                sp_message: (_f = result === null || result === void 0 ? void 0 : result[0]) === null || _f === void 0 ? void 0 : _f.sp_message,
                method: (_g = result === null || result === void 0 ? void 0 : result[0]) === null || _g === void 0 ? void 0 : _g.method,
                date_time: (_h = result === null || result === void 0 ? void 0 : result[0]) === null || _h === void 0 ? void 0 : _h.date_time,
                bank_status: (_j = result === null || result === void 0 ? void 0 : result[0]) === null || _j === void 0 ? void 0 : _j.bank_status,
            },
        }, { new: true, runValidators: true });
        yield session.commitTransaction();
        yield session.endSession();
        return result;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new AppError_1.default(err, 'Failed to verify payment');
    }
});
const removeItemFromCart = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedCart = yield orders_model_1.Models.CartModel.findByIdAndDelete(orderId);
    if (!deletedCart) {
        return {
            success: false,
            message: "Cart item not found",
        };
    }
    return deletedCart;
});
const deleteOrderFromDb = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedOrder = yield orders_model_1.Models.OrderModel.findByIdAndDelete(orderId);
    if (!deletedOrder) {
        return {
            success: false,
            message: "Order item not found",
        };
    }
    return deletedOrder;
});
const getAllOrdersOfUserIntoDb = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield orders_model_1.Models.OrderModel.findById(orderId).populate('products');
    return result;
});
const getAllOrdersIntoDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield orders_model_1.Models.OrderModel.find().populate('products');
    return result;
});
exports.orderService = {
    addToCartIntoDb, getAllOrdersOfUserDashboardIntoDb,
    generateRevenueFromDb,
    getSingleUserCartFromDb,
    getAllOrdersOfUserIntoDb,
    removeItemFromCart,
    makePaymentIntoDb,
    verifyPaymentIntoDb,
    createOrderIntoDb,
    getSingleOrderFromDb,
    getAllOrdersIntoDb, deleteOrderFromDb, getSingleOrdersOfUserFromDb
};
