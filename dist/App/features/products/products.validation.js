"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductsValidationSchema = exports.createProductsValidationSchema = exports.addToCartValidationSchema = void 0;
const zod_1 = require("zod");
const createProductsValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Name is required'),
    brand: zod_1.z.string().min(1, 'Brand is required'),
    price: zod_1.z.number().min(0, 'Price must be a positive number'),
    category: zod_1.z.enum([
        'Writing',
        'Office Supplies',
        'Art Supplies',
        'Educational',
        'Technology',
    ]),
    description: zod_1.z.string().min(1, 'Description is required'),
    quantity: zod_1.z.number().int().min(0, 'Quantity must be a positive integer'),
    profileImage: zod_1.z.object({
        filename: zod_1.z.string().optional(),
        path: zod_1.z.string().optional(),
        mimetype: zod_1.z.string().optional(),
    }).optional(),
    inStock: zod_1.z.boolean().optional().default(true),
    isFeatured: zod_1.z.boolean().optional().default(false),
    rating: zod_1.z.number().optional(),
    features: zod_1.z.string()
});
exports.createProductsValidationSchema = createProductsValidationSchema;
const updateProductsValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Name is required').optional(),
    brand: zod_1.z.string().min(1, 'Brand is required').optional(),
    price: zod_1.z.number().min(0, 'Price must be a positive number').optional(),
    category: zod_1.z.enum([
        'Writing',
        'Office Supplies',
        'Art Supplies',
        'Educational',
        'Technology',
    ]).optional(),
    description: zod_1.z.string().min(1, 'Description is required').optional(),
    quantity: zod_1.z.number().int().min(0, 'Quantity must be a positive integer').optional(),
    profileImage: zod_1.z.object({
        filename: zod_1.z.string().optional(),
        path: zod_1.z.string().optional(),
        mimetype: zod_1.z.string().optional(),
    }).optional(),
    inStock: zod_1.z.boolean().optional(),
    isFeatured: zod_1.z.boolean().optional(),
    rating: zod_1.z.number().optional(),
    features: zod_1.z.string().optional()
});
exports.updateProductsValidationSchema = updateProductsValidationSchema;
const addToCartValidationSchema = zod_1.z.object({
    userEmail: zod_1.z.string(),
    productId: zod_1.z.string(),
    quantity: zod_1.z.number().int().min(1, 'Quantity must be a positive integer'),
    total: zod_1.z.number(),
});
exports.addToCartValidationSchema = addToCartValidationSchema;
