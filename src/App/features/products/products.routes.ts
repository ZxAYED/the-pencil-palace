import { Router } from "express"
import { productsController } from "./products.controller"
import validateRequest from "../../utils/ValidateRequest"
import { createProductsValidationSchema, updateProductsValidationSchema } from "./products.validation"
import auth from "../../middleware/auth"


const productsRouter = Router()

productsRouter.post('/', auth('user', 'admin'), validateRequest(createProductsValidationSchema), productsController.createproduct)
productsRouter.get('/', auth('user', 'admin'), productsController.getAllproducts)
productsRouter.get('/:productId', auth('user', 'admin'), productsController.getSingleproduct)
productsRouter.patch('/:productId', auth('user', 'admin'), validateRequest(updateProductsValidationSchema), productsController.updateProduct)
productsRouter.delete('/:productId', auth('user', 'admin'), productsController.deleteProduct)

export default productsRouter