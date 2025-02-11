/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from "../../Error/AppError"
import QueryBuilder from "../../utils/QueryBuilder";
import UploadImageToCloudinary from "../../utils/UploadImageToCloudinary";
import { ICart, IProduct } from "./products.interface"
    ;
import { cartModel, productsModel } from "./products.model";



const createProductIntoDb = async (file: any, payload: IProduct) => {

    if (file) {
        const imageName = `${payload?.name}+${Date.now()}`;
        const path = file?.buffer;
        const uploadResponse = await UploadImageToCloudinary(imageName, path);
        payload.profileImage = uploadResponse.url;

    }

    const result = await productsModel.create(payload)
    return result

}


const getAllProductsFromDb = async (query: any) => {

    const SearchableFields = ['name', 'brand', 'category', 'description']

    const productsQuery = new QueryBuilder(
        productsModel.find(), query)
        .search(SearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();



    const result = await productsQuery.modelQuery;


    return result

}
const getSingleProductFromDb = async (payload: string) => {
    const product = await productsModel.findById(payload)
    return product

}

const updateProductIntoDb = async (payload: string, data: IProduct, file: any) => {

    if (file) {
        const imageName = `${data?.name}_${Date.now()}`;
        const fileBuffer = file?.buffer;

        try {
            const uploadResponse = await UploadImageToCloudinary(imageName, fileBuffer);
            data.profileImage = uploadResponse.url;
        } catch (error) {
            console.log(error)
            throw new AppError(500, 'Failed to upload image');

        }
    }

    const product = await productsModel.findByIdAndUpdate(payload, data, {
        new: true,
        runValidators: true,
    });

    return product;
};


const deleteProductIntoDb = async (payload: string) => {
    const findProduct = await productsModel.findById(payload)
    if (!findProduct) {
        throw new AppError(404, 'Product not found')
    }
    const product = await productsModel.findByIdAndDelete(payload)
    return product
}

const addToCart = async (payload: ICart) => {
    const product = await cartModel.create(payload)
    return product
}
const deleteCart = async (payload: string) => {
    const product = await cartModel.findByIdAndDelete(payload)
    return product
}


const getCart = async (userEmail: string) => {

    const product = await cartModel.find({ userEmail }).populate('productId').populate('userId')
    return product
}

export const productsService = {
    createProductIntoDb,
    getAllProductsFromDb,
    getSingleProductFromDb,
    updateProductIntoDb,
    deleteProductIntoDb,
    getCart,
    addToCart,
    deleteCart
}
