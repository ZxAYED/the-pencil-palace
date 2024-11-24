import { Schema, model } from 'mongoose';
import { IProduct } from './products.interface'


const productsSchema = new Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    category: {
        type: String, enum: ['Writing', 'Office Supplies', 'Art Supplies', 'Educational', 'Technology'],
        required: true
    },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    photo: { type: String, required: true },
    inStock: { type: Boolean, required: true }
},
    { timestamps: true });


const productsModel = model<IProduct>('products', productsSchema,);

export default productsModel;
