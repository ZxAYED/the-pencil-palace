import { Router } from 'express'
import { orderController } from './orders.controller'
import validateRequest from '../../utils/ValidateRequest'
import { createOrderValidation, updateOrderValidation } from './orders.validation'
import auth from '../../middleware/auth'



const orderRoutes = Router()
orderRoutes.post('/', auth('user'), validateRequest(createOrderValidation), orderController.createOrder)
orderRoutes.get('/revenue', auth('admin'), orderController.generateRevenue)
orderRoutes.get('/', auth('user'), validateRequest(updateOrderValidation), orderController.getAllOrder)


export default orderRoutes
