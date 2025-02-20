import { Schema, model } from 'mongoose'
import { IProduct } from './products.interface'

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
    isFeatured: { type: Boolean, default: false },
    rating: { type: Number, required: true },
  },
  { timestamps: true },
)

export const productsModel = model<IProduct>('products', productsSchema)



