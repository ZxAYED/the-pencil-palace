import { Router } from 'express'
import { productsController } from './products.controller'

const productsRouter = Router()

productsRouter.post('/', productsController.createproduct)
productsRouter.get('/', productsController.getAllproducts)
productsRouter.get('/:productId', productsController.getSingleproduct)
productsRouter.put('/:productId', productsController.updateProduct)
productsRouter.delete('/:productId', productsController.deleteProduct)

export default productsRouter
