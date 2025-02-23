"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productsSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    category: {
        type: String,
        enum: [
            'Writing',
            'Office Supplies',
            'Art Supplies',
            'Educational',
            'Technology',
        ],
        required: true,
    },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    photo: { type: String, required: true },
    inStock: { type: Boolean, required: true },
}, { timestamps: true });
const productsModel = (0, mongoose_1.model)('products', productsSchema);
exports.default = productsModel;
