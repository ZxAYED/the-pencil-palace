import { z } from "zod";

const validStatus = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'] as const;
const validPaymentStatus = ['Pending', 'Paid', 'Initiated', 'Cancelled', 'Failed'] as const;

const createOrderValidation = z.object({
    email: z.string().email({ message: "Invalid email format" }),
    product: z.string({ message: "Product ID is required" }),
    status: z.enum(validStatus, { message: "Invalid order status" }),
    payment: z.object({
        status: z.enum(validPaymentStatus, { message: "Invalid payment status" }).optional(),
        OrderId: z.string().optional(),
        sp_code: z.number().optional(),
        sp_message: z.string().optional(),
        method: z.string().optional(),
        date_time: z.string().optional(),
        bank_status: z.string().optional(),
    }),
    quantity: z.number().int().positive({ message: "Quantity must be a positive integer" }),
    totalPrice: z.number().nonnegative({ message: "Total price must be non-negative" }),
});

const updateOrderValidation = z.object({
    email: z.string().email({ message: "Invalid email format" }).optional(),
    product: z.string({ message: "Product ID cannot be empty" }).optional(),
    status: z.enum(validStatus, { message: "Invalid order status" }).optional(),
    payment: z.object({
        status: z.enum(validPaymentStatus, { message: "Invalid payment status" }).optional(),
        OrderId: z.string().optional(),
        sp_code: z.number().optional(),
        sp_message: z.string().optional(),
        method: z.string().optional(),
        date_time: z.string().optional(),
        bank_status: z.string().optional(),
    }).optional(),
    quantity: z.number().int().positive({ message: "Quantity must be a positive integer" }).optional(),
    totalPrice: z.number().nonnegative({ message: "Total price must be non-negative" }).optional(),
});

export { createOrderValidation, updateOrderValidation };
