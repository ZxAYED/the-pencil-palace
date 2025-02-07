import { Schema, Types, model } from 'mongoose'
import IOrder from './orders.interface'

const orderSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: [/.+\.+\..+/, 'Please enter a valid email address'],
      maxlength: [100, 'Email cannot be longer than 100 characters'],
    },
    products: [{
      product: {
        type: Types.ObjectId,
        ref: 'Product',
      },
      quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: [1, 'Quantity cannot be less than 1'],
        max: [100, 'Quantity cannot be more than 100'],
        default: 1,
      },
    }],
    status: {
      type: String,
      enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Pending',
    },
    payment: {
      status: {
        type: String,
        enum: ['Pending', 'Paid', 'Initiated', 'Cancelled', 'Failed'],
        default: 'Pending',
      },
      OrderId: {
        type: String,
        default: '',
      },
      sp_code: {
        type: Number,
        default: 0,
      },
      sp_message: {
        type: String,
        default: '',
      },
      method: {
        type: String,
        default: '',
      },
      date_time: {
        type: String,
        default: '',
      },
      bank_status: {
        type: String,
        default: '',
      },
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
