import { Router } from "express";
import { productsController } from "./products.controller";

const productsRouter = Router()

productsRouter.post('/create-product', productsController.createproduct);
productsRouter.get('/get-all-products', productsController.getAllproducts);
productsRouter.get('/get-single-product/:productId', productsController.getSingleproduct);






export default productsRouter