import { Request, Response } from "express";
import OrderModel from "./orders.model";
import productsModel from "../products/products.model";

import { IProduct } from "../products/products.interface";
import IOrder from "./orders.interface";



export const createOrder = async (req: Request, res: Response) => {
    try {
        const payload: IOrder = req.body
        const productData = await productsModel.findById(payload.product);

        if (!productData) {
            return res.status(404).json({
                message: "Product not found",
                success: false,
            });
        }
        if (!productData.inStock || productData.quantity < req.body.quantity) {
            console.log(productData);
            return res.status(400).json({
                message: "Insufficient stock",
                success: false,
            });
        }
        const quantity = productData.quantity - payload.quantity
        const updatedData = {
            quantity: quantity,
            inStock: !quantity ? false : true
        }
        await productsModel.findByIdAndUpdate(payload.product, updatedData)



        const result = await OrderModel.create(payload)
        res.status(200).json({
            "message": " Order has been placed ",
            "success": 200,
            "status": 200,
            data: result
        })
    }
    catch (error) {
        res.status(500).json({
            "message": "Error while creating an order",
            "success": false,
            "status": 500,
            error
        })
    }

}

export const orderController = {
    createOrder
}