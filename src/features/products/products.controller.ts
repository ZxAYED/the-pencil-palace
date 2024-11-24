import { Request, Response } from "express";
import productsModel from './products.model'

import { productsValidationSchema } from "./products.validation";

const createproduct = async (req: Request, res: Response) => {
    try {
        const payload = req.body

        const validPaylod = productsValidationSchema.parse(payload)
        const result = await productsModel.create(validPaylod)
        res.json({
            "message": "Product created successfully",
            "success": true,
            "data": result
        })
    }
    catch (error) {
        res.status(500).json({
            "message": "Error while creating a products",
            "success": false,
            "status": 404,
            error
        })
        console.log(error);
    }

}
const getAllproducts = async (req: Request, res: Response) => {
    try {
        const result = await productsModel.find()
        res.json({
            "message": "Products retrieved successfully ",
            "success": true,
            "data": result
        })
    }
    catch (error) {
        res.status(500).json({
            "message": "Error while retrieved  a products",
            "success": false,
            "status": 404,
            error
        })
    }
}


const getSingleproduct = async (req: Request, res: Response) => {
    try {
        const payload = req.params.productId
        // const validPaylod = productsValidationSchema.parse(payload)
        const result = await productsModel.findById(payload)
        res.json({
            "message": "Product retrieved  successfully",
            "success": true,
            "data": result
        })
    }
    catch (error) {
        res.status(500).json({
            "message": "Error while retrieved  a product",
            "success": false,
            "status": 500,
            error
        })
    }
}




export const productsController = {
    createproduct, getAllproducts, getSingleproduct
}