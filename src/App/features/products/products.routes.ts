import { Router } from "express"
import { productsController } from "./products.controller"
import validateRequest from "../../utils/ValidateRequest"
import { addToCartValidationSchema, createProductsValidationSchema, updateProductsValidationSchema } from "./products.validation"
import auth from "../../middleware/auth"
import upload from "../../utils/multer.config"
import AppError from "../../Error/AppError"


const productsRouter = Router()

productsRouter.post(
    '/',
    auth('admin'),
    upload.single('profileImage'),
    (req, res, next) => {
        req.body.price = parseFloat(req.body.price);
        req.body.quantity = parseInt(req.body.quantity, 10);
        req.body.rating = parseFloat(req.body.rating);
        if (req.body.isFeatured) {
            req.body.isFeatured = req.body.isFeatured === 'true';
        }
        if (req.body.inStock) {
            req.body.inStock = req.body.inStock === 'true';
        }
        if (!req.body || !req.file) {
            return next(new AppError(400, 'Missing required fields or file'));
        }

        req.body.profileImage = req.file;
        next();
    },
    validateRequest(createProductsValidationSchema),
    productsController.createproduct
);

productsRouter.get('/', productsController.getAllproducts)

productsRouter.get('/:productId', productsController.getSingleproduct)

productsRouter.patch('/:productId', auth('admin'), upload.single('profileImage'), (req, res, next) => {
    req.body.price = parseFloat(req.body.price);
    req.body.quantity = parseInt(req.body.quantity, 10);
    req.body.rating = parseFloat(req.body.rating)
    if (req.body.isFeatured) {
        req.body.isFeatured = req.body.isFeatured === 'true';
    }
    if (req.body.inStock) {
        req.body.inStock = req.body.inStock === 'true';
    }
    req.body.profileImage = req?.file;
    next();
}, validateRequest(updateProductsValidationSchema), productsController.updateProduct)

productsRouter.delete('/:productId', auth('admin'), productsController.deleteProduct)



productsRouter.post('/cart', auth('user'), validateRequest(addToCartValidationSchema), productsController.addToCart)
productsRouter.get('/cart/:userEmail', auth('user'), productsController.getCart)
productsRouter.delete('/cart/:id', auth('user'), productsController.deleteCart)



export default productsRouter