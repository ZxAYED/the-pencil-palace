import { Schema, model } from 'mongoose'
import IOrder from './orders.interface'

const orderSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: [/.+\.+\..+/, 'Please enter a valid email address'],
      maxlength: [100, 'Email cannot be longer than 100 characters'],
    },
    product: {
      type: String,

      required: [true, 'Product is required'],
    },
    status: {
      type: String,
      enum: ['Pending', 'Processing', 'Shipped', 'Delivered'],
      default: 'Pending',
    },
    isPaid: {
      type: String,
      enum: ['Pending', 'Paid', 'Cancelled'],
      default: 'Pending',
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
  },
  { timestamps: true },
)

const OrderModel = model<IOrder>('Order', orderSchema)

export default OrderModel
