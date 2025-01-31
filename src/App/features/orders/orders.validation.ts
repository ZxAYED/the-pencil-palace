import { z } from "zod";

const validStatus = ["Pending", "Shipped", "Delivered", "Canceled"] as const;
const validPaymentStatus = ['Pending', 'Paid', 'Cancelled'] as const;

const createOrderValidation = z.object({
    email: z.string().email({ message: "Invalid email format" }),
    product: z.string({ message: "Product ID is required" }),
    status: z.enum(validStatus, { message: "Invalid order status" }),
    isPaid: z.enum(validPaymentStatus, { message: "Invalid payment status" }),
    quantity: z.number().int().positive({ message: "Quantity must be a positive integer" }),
    totalPrice: z.number().nonnegative({ message: "Total price must be non-negative" }),
});

const updateOrderValidation = z.object({
    email: z.string().email({ message: "Invalid email format" }).optional(),
    product: z.string({ message: "Product ID cannot be empty" }).optional(),
    status: z.enum(validStatus, { message: "Invalid order status" }).optional(),
    isPaid: z.enum(validPaymentStatus, { message: "Invalid payment status" }).optional(),
    quantity: z.number().int().positive({ message: "Quantity must be a positive integer" }).optional(),
    totalPrice: z.number().nonnegative({ message: "Total price must be non-negative" }).optional(),
});

export { createOrderValidation, updateOrderValidation };
