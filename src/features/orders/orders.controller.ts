import { Request, Response, NextFunction } from 'express';
import OrderModel from './orders.model';
import productsModel from '../products/products.model';
import IOrder from './orders.interface';

const createOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const payload: IOrder = req.body;
    const productData = await productsModel.findById(payload.product);

    if (!productData) {
      res.status(404).json({
        message: 'Product not found',
        success: false,
      });
      return;
    }

    if (!productData.inStock || productData.quantity < req.body.quantity) {
      res.status(400).json({
        message: 'Insufficient stock',
        success: false,
      });
      return;
    }

    const quantity = productData.quantity - payload.quantity;
    const updatedData = {
      quantity: quantity,
      inStock: quantity > 0,
    };
    await productsModel.findByIdAndUpdate(payload.product, updatedData);
    const result = await OrderModel.create(payload);
    res.status(200).json({
      message: 'Order has been placed',
      success: true,
      status: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllOrder = async (req, res) => {
  const result = await OrderModel.find()
  res.send(result)
}

const generateRevenue = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await OrderModel.aggregate([
      {
        $addFields: {
          total: { $multiply: ['$totalPrice', '$quantity'] },
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$total' },
        },
      },
    ]);

    if (result.length > 0) {
      const totalRevenue = result[0].totalRevenue;
      res.status(200).json({
        message: 'Revenue calculated successfully',
        success: true,
        data: { totalRevenue },
      });
    } else {
      res.status(200).json({
        message: 'No revenue data found',
        success: true,
        data: { totalRevenue: 0 },
      });
    }
  } catch (error) {
    next(error);
  }
};

export const orderController = {
  createOrder,
  generateRevenue, getAllOrder
};
