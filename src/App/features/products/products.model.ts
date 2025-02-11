import { Schema, model } from 'mongoose'
import { ICart, IProduct } from './products.interface'

const productsSchema = new Schema(
  {
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
    features: { type: String, required: true },
    quantity: { type: Number, required: true },
    profileImage: { type: String, required: true },
    inStock: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: true },
    rating: { type: Number, required: true },
  },
  { timestamps: true },
)
const cartSchema = new Schema(
  {
    productId: {
      type: String,
      required: true,
      ref: 'products'
    },
    userEmail: {
      type: String,
      required: true,

    },
    userId: {
      type: String,
      required: true,
      ref: 'User',
    },
    quantity: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
  },
  { timestamps: true },
)
export const productsModel = model<IProduct>('products', productsSchema)
export const cartModel = model<ICart>('cart', cartSchema)


