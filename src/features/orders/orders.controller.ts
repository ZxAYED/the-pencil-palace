import { Request, Response } from 'express'
import OrderModel from './orders.model'
import productsModel from '../products/products.model'
import IOrder from './orders.interface'

const createOrder = async (req: Request, res: Response) => {
  try {
    const payload: IOrder = req.body
    const productData = await productsModel.findById(payload.product)

    if (!productData) {
      return res.status(404).json({
        message: 'Product not found',
        success: false,
      })
    }
    if (!productData.inStock || productData.quantity < req.body.quantity) {
      return res.status(400).json({
        message: 'Insufficient stock',
        success: false,
      })
    }
    const quantity = productData.quantity - payload.quantity
    const updatedData = {
      quantity: quantity,
      inStock: !quantity ? false : true,
    }
    await productsModel.findByIdAndUpdate(payload.product, updatedData)
    const result = await OrderModel.create(payload)
    res.status(200).json({
      message: ' Order has been placed ',
      success: 200,
      status: 200,
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error while creating an order',
      success: false,
      status: 500,
      error,
    })
  }
}
const generateRevenue = async (req: Request, res: Response) => {
  try {
    const result = await OrderModel.aggregate([
      {
        $addFields: {
          total: {
            $multiply: ['$totalPrice', '$quantity'],
          },
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$total' },
        },
      },
    ])
    const totalRevenue = result[0].totalRevenue
    return res.status(200).json({
      message: 'Revenue calculated successfully',
      status: true,
      data: { totalRevenue },
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error while calculating revenue',
      success: false,
      status: 500,
      error,
    })
  }
}

export const orderController = {
  createOrder,
  generateRevenue,
}
