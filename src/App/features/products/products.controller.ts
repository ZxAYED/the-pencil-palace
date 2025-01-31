import { Request, Response } from 'express'
import productsModel from './products.model'
import { productsService } from './products.service'



const createproduct = async (req: Request, res: Response) => {

  const result = await productsService.createProductIntoDb(req.body)
  res.status(200).json({
    message: 'Product created successfully',
    status: true,
    data: result,
  })


}
const getAllproducts = async (req: Request, res: Response) => {
  const result = await productsService.getAllProductsFromDb(req.query)
  res.status(200).json({
    message: 'Products retrieved successfully',
    status: true,
    data: result,
  })


}

const getSingleproduct = async (req: Request, res: Response) => {

  const result = await productsService.getSingleProductFromDb(req.params.productId)
  res.status(200).json({
    message: 'Product retrieved successfully',
    status: true,
    data: result,
  })


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
