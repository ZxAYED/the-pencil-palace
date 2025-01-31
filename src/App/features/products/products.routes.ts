import { Router } from "express"
import { productsController } from "./products.controller"
import validateRequest from "../../utils/ValidateRequest"
import { createProductsValidationSchema, updateProductsValidationSchema } from "./products.validation"


const productsRouter = Router()

productsRouter.post('/', validateRequest(createProductsValidationSchema), productsController.createproduct)
productsRouter.get('/', productsController.getAllproducts)
productsRouter.get('/:productId', productsController.getSingleproduct)
productsRouter.patch('/:productId', validateRequest(updateProductsValidationSchema), productsController.updateProduct)
productsRouter.delete('/:productId', productsController.deleteProduct)

export default productsRouter