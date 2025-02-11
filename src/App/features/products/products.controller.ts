import { Request, Response } from 'express'
import { productsService } from './products.service'
import CatchAsync from '../../utils/CatchAsync'



const createproduct = async (req: Request, res: Response) => {

  const result = await productsService.createProductIntoDb(req.file, req.body)
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

const updateProduct = CatchAsync(async (req: Request, res: Response) => {

  const payload = req.params.productId
  const data = req.body
  const result = await productsService.updateProductIntoDb(payload, data, req.file)
  res.status(200).json({
    message: 'Product updated  successfully',
    success: true,
    data: result,
  })
})


const deleteProduct = CatchAsync(async (req: Request, res: Response) => {

  const result = await productsService.deleteProductIntoDb(req.params.productId)
  res.status(200).json({
    message: 'Product deleted successfully',
    success: true,
    data: result,
  })


})

const addToCart = CatchAsync(async (req: Request, res: Response) => {
  const result = await productsService.addToCart(req.body)
  res.status(200).json({
    message: 'Product added to cart successfully',
    data: result,
  })
})

const getCart = CatchAsync(async (req: Request, res: Response) => {
  const result = await productsService.getCart(req.params.userEmail)
  res.status(200).json({
    message: 'Cart retrieved successfully',
    data: result,
  })
})
const deleteCart = CatchAsync(async (req: Request, res: Response) => {

  const result = await productsService.deleteCart(req.params.id)
  res.status(200).json({
    message: 'Cart deleted successfully',
    data: result,
  })
})
export const productsController = {
  createproduct,
  getAllproducts,
  getSingleproduct,
  updateProduct,
  deleteProduct,
  addToCart,
  getCart,
  deleteCart
}
