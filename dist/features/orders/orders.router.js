"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orders_controller_1 = require("./orders.controller");
const orderRouter = (0, express_1.Router)();
orderRouter.post('/', orders_controller_1.orderController.createOrder);
orderRouter.get('/revenue', orders_controller_1.orderController.generateRevenue);
exports.default = orderRouter;
