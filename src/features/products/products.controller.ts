import { Request, Response } from 'express'
import productsModel from './products.model'

import { productsValidationSchema } from './products.validation'

const createproduct = async (req: Request, res: Response) => {
  try {
    const payload = req.body

    const validPaylod = productsValidationSchema.parse(payload)
    const result = await productsModel.create(validPaylod)
    res.json({
      message: 'Product created successfully',
      success: true,
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error while creating a products',
      success: false,
      status: 404,
      error,
    })
  }
}
const getAllproducts = async (req: Request, res: Response) => {
  try {
    const { name, brand, category } = req.query
    const filter = {}
    if (name) filter.name = name
    if (brand) filter.brand = brand
    if (category) filter.category = category

    const products = await productsModel.find(filter)
    res.status(200).json({
      message: 'Products retrieved successfully',
      status: true,
      data: products,
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving products',
      success: false,
      error,
    })
  }
}

const getSingleproduct = async (req: Request, res: Response) => {
  try {
    const payload = req.params.productId
    // const validPaylod = productsValidationSchema.parse(payload)
    const result = await productsModel.findById(payload)
    res.json({
      message: 'Product retrieved  successfully',
      success: true,
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error while retrieved  a product',
      success: false,
      status: 500,
      error,
    })
  }
}
const updateProduct = async (req: Request, res: Response) => {
  try {
    const payload = req.params.productId
    const data = req.body
    // const validPaylod = productsValidationSchema.parse(payload)
    const result = await productsModel.findByIdAndUpdate(payload, data, {
      new: true,
    })
    res.json({
      message: 'Product updated  successfully',
      success: true,
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error while updating  a product',
      success: false,
      status: 500,
      error,
    })
  }
}
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const payload = req.params.productId
    // const validPaylod = productsValidationSchema.parse(payload)
    const result = await productsModel.findByIdAndDelete(payload, {
      new: true,
    })
    res.json({
      message: 'Product deleted successfully',
      success: true,
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error while deleting  a product',
      success: false,
      status: 500,
      error,
    })
  }
}

export const productsController = {
  createproduct,
  getAllproducts,
  getSingleproduct,
  updateProduct,
  deleteProduct,
}
