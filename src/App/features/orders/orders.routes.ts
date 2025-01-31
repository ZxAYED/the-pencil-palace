import { Router } from 'express'
import { orderController } from './orders.controller'
import validateRequest from '../../utils/ValidateRequest'
import { createOrderValidation, updateOrderValidation } from './orders.validation'



const orderRoutes = Router()
orderRoutes.post('/', validateRequest(createOrderValidation), orderController.createOrder)
orderRoutes.get('/revenue', orderController.generateRevenue)
orderRoutes.get('/', validateRequest(updateOrderValidation), orderController.getAllOrder)


export default orderRoutes
