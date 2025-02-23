"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: [/.+\@.+\..+/, 'Please enter a valid email address'],
        maxlength: [100, 'Email cannot be longer than 100 characters'],
    },
    product: {
        type: String,
        required: [true, 'Product is required'],
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: [1, 'Quantity cannot be less than 1'],
        max: [100, 'Quantity cannot be more than 100'],
        default: 1,
    },
    totalPrice: {
        type: Number,
        required: [true, 'Total price is required'],
        min: [0, 'Total price cannot be negative'],
    },
}, { timestamps: true });
const OrderModel = (0, mongoose_1.model)('Order', orderSchema);
exports.default = OrderModel;
