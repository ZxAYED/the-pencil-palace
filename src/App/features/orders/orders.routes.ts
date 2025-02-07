import { Router } from 'express'
import { orderController } from './orders.controller'
import validateRequest from '../../utils/ValidateRequest'
import { createOrderValidation, updateOrderValidation } from './orders.validation'
import auth from '../../middleware/auth'



const orderRoutes = Router()
orderRoutes.post('/', auth('user'), validateRequest(createOrderValidation), orderController.createOrder)
orderRoutes.get('/revenue', auth('admin'), orderController.generateRevenue)
orderRoutes.get('/revenue/:email', auth('user'), orderController.generateRevenueForUser)
orderRoutes.get('/', auth('user'), validateRequest(updateOrderValidation), orderController.getAllOrder)
orderRoutes.delete('/:id', auth('user'), orderController.cancelOrder)
orderRoutes.post('/payment', auth('user'), orderController.makePayment)
orderRoutes.get('/payment/verify-payment', auth('user'), orderController.verifyPayment)

export default orderRoutes
