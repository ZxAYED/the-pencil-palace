"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Models = void 0;
const mongoose_1 = require("mongoose");
const cartSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        maxlength: [100, 'Email cannot be longer than 100 characters'],
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    products: {
        product: {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'products',
            required: true,
        },
        quantity: {
            type: Number,
            required: [true, 'Quantity is required'],
            min: [1, 'Quantity cannot be less than 1'],
            max: [100, 'Quantity cannot be more than 100'],
            default: 1,
        },
    },
    totalPrice: {
        type: Number,
        required: [true, 'Total price is required'],
        min: [0, 'Total price cannot be negative'],
    },
}, { timestamps: true });
const orderSchema = new mongoose_1.Schema({
    userEmail: {
        type: String,
        required: [true, 'Email is required'],
        maxlength: [100, 'Email cannot be longer than 100 characters'],
    },
    totalPrice: {
        type: Number,
        required: [true, 'Total price is required'],
        min: [0, 'Total price cannot be negative'],
    },
    quantity: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending',
    },
    payment: {
        status: {
            type: String,
            enum: ['Pending', 'Paid', 'Initiated', 'Cancelled', 'Failed'],
            default: 'Pending',
        },
        sp_code: Number,
        sp_message: String,
        method: String,
        date_time: String,
        bank_status: String,
    },
    products: {
        type: [String],
        required: [true, 'Product Ids are required'],
        ref: 'products'
    },
    OrderId: String,
}, { timestamps: true });
const CartModel = (0, mongoose_1.model)('Carts', cartSchema);
const OrderModel = (0, mongoose_1.model)('Orders', orderSchema);
exports.Models = { CartModel, OrderModel };
