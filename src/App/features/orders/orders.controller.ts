import { Request, Response } from 'express';
import { orderService } from './orders.service';
import CatchAsync from '../../utils/CatchAsync';
import OrderModel from './orders.model';




const createOrder = CatchAsync(async (req: Request, res: Response) => {

  const result = await orderService.createOrderIntoDb(req.body);
  res.status(200).json({
    message: 'Order has been placed',
    success: true,
    status: 200,
    data: result,
  });
})

const getAllOrder = CatchAsync(async (req: Request, res: Response) => {
  const result = await orderService.getAllOrderIntoDb()
  res.status(200).json({
    message: 'All items fetched successfully',
    success: true,
    status: 200,
    data: result,
  })
})
const cancelOrder = CatchAsync(async (req: Request, res: Response) => {
  const result = await orderService.cancelOrderIntoDb(req.params.id)
  res.status(200).json({
    message: 'Order cancelled successfully',
    success: true,
    status: 200,
    data: result,
  })
})

const generateRevenue = CatchAsync(async (req: Request, res: Response) => {
  const result = await orderService.generateRevenueFromDb()
  res.status(200).json({
    message: 'Revenue calculated successfully',
    success: true,
    status: 200,
    data: result,
  })
})
const generateRevenueForUser = CatchAsync(async (req: Request, res: Response) => {
  const result = await orderService.generateRevenueForUser(req.params.email)
  res.status(200).json({
    message: 'Revenue calculated successfully',
    success: true,
    status: 200,
    data: result,
  })
})
const makePayment = CatchAsync(async (req: Request, res: Response) => {
  const result = await orderService.makePaymentIntoDb(req.body, req.ip as string)

  if (result?.transactionStatus === 'Completed') {
    await OrderModel.findByIdAndUpdate(req.body.orderId, { paymentStatus: 'Initiated' })
  }
  res.status(200).json({
    message: 'Payment successful',
    success: true,
    status: 200,
    data: result,
  })
})
const verifyPayment = CatchAsync(async (req: Request, res: Response) => {

  const result = await orderService.verifyPaymentIntoDb(req.query.orderId as string)

  await OrderModel.findByIdAndUpdate(req.query.orderId as string, { status: result.transactionStatus })
  res.status(200).json({
    message: 'Payment verified successfully',
    success: true,
    data: result,
  })
})
export const orderController = {
  createOrder,
  generateRevenue, getAllOrder, generateRevenueForUser, cancelOrder, makePayment, verifyPayment
};
