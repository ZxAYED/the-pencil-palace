"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCartValidation = exports.orderValidation = exports.addToCartValidation = void 0;
const zod_1 = require("zod");
const validStatus = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
const validPaymentStatus = ['Pending', 'Paid', 'Initiated', 'Cancelled', 'Failed'];
const addToCartValidation = zod_1.z.object({
    email: zod_1.z.string({ message: "Invalid email format" }),
    products: zod_1.z.object({
        product: zod_1.z.string({ message: "Product ID is required" }),
        quantity: zod_1.z.number().int().positive({ message: "Quantity must be a positive integer" }),
    }),
    userId: zod_1.z.string(),
    totalPrice: zod_1.z.number().nonnegative({ message: "Total price must be non-negative" }),
});
exports.addToCartValidation = addToCartValidation;
const orderValidation = zod_1.z.object({
    userEmail: zod_1.z.string().email({ message: "Invalid email format" }),
    totalPrice: zod_1.z.number().nonnegative({ message: "Total price must be non-negative" }),
    quantity: zod_1.z.number().int().positive({ message: "Quantity must be a positive integer" }),
    status: zod_1.z.enum(validStatus, { message: "Invalid order status" }).optional().default("Pending"),
    payment: zod_1.z.object({
        status: zod_1.z.enum(validPaymentStatus, { message: "Invalid payment status" }).optional(),
        OrderId: zod_1.z.string().optional(),
        sp_code: zod_1.z.number().optional(),
        sp_message: zod_1.z.string().optional(),
        method: zod_1.z.string().optional(),
        date_time: zod_1.z.string().optional(),
        bank_status: zod_1.z.string().optional(),
    }).optional(),
});
exports.orderValidation = orderValidation;
const updateCartValidation = zod_1.z.object({
    email: zod_1.z.string({ message: "Invalid email format" }).optional(),
    products: zod_1.z.object({
        product: zod_1.z.string({ message: "Product ID is required" }).optional(),
        quantity: zod_1.z.number().int().positive({ message: "Quantity must be a positive integer" }).optional(),
    }).optional(),
    userId: zod_1.z.string().optional(),
    totalPrice: zod_1.z.number().nonnegative({ message: "Total price must be non-negative" }).optional(),
});
exports.updateCartValidation = updateCartValidation;
