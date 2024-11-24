import { Router } from "express";

import { orderController } from "./orders.controller";


const orderRouter = Router()

orderRouter.post('/', orderController.createOrder)

export default orderRouter

