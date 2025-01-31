import { Router } from 'express'
import { orderController } from './orders.controller'



const orderRoutes = Router()
orderRoutes.post('/', orderController.createOrder)
orderRoutes.get('/revenue', orderController.generateRevenue)
orderRoutes.get('/', orderController.getAllOrder)


export default orderRoutes
