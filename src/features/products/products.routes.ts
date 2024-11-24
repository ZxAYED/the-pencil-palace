import { Router } from "express";
import { productsController } from "./products.controller";

const productsRouter = Router()

productsRouter.post('/create-product', productsController.createproduct);
productsRouter.get('/get-products', productsController.getAllproducts);
productsRouter.get('/get-product/:productId', productsController.getSingleproduct);






export default productsRouter