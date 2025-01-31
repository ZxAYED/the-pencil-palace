import { Request, Response } from 'express';
import { orderService } from './orders.service';
import CatchAsync from '../../utils/CatchAsync';




const createOrder = CatchAsync(async (req: Request, res: Response,) => {

  const result = await orderService.createOrderIntoDb(req.body);
  res.status(200).json({
    message: 'Order has been placed',
    success: true,
    status: 200,
    data: result,
  });
})

const getAllOrder = CatchAsync(async (req, res) => {
  const result = await orderService.getAllOrderIntoDb()
  res.status(200).json({
    message: 'All items fetched successfully',
    success: true,
    status: 200,
    data: result,
  })
})

const generateRevenue = CatchAsync(async (req, res) => {
  const result = await orderService.generateRevenueFromDb()
  res.status(200).json({
    message: 'Revenue calculated successfully',
    success: true,
    status: 200,
    data: result,
  })
})



export const orderController = {
  createOrder,
  generateRevenue, getAllOrder
};
