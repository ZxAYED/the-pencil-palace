/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from "../../Error/AppError"
import UploadImageToCloudinary from "../../utils/UploadImageToCloudinary";
import { IProduct } from "./products.interface"
import productsModel from "./products.model"


const createProductIntoDb = async (file: any, payload: IProduct) => {

    if (file) {
        const imageName = `${payload?.name}+${new Date().getTime()}`;
        const path = file?.path;
        const uploadResponse = await UploadImageToCloudinary(imageName, path);
        payload.profileImage = uploadResponse.url;
    }

    const result = await productsModel.create(payload)
    return result

}


const getAllProductsFromDb = async (payload: any) => {

    const { name, brand, category } = payload
    const filter: { [key: string]: unknown } = {}
    if (name) filter.name = name
    if (brand) filter.brand = brand
    if (category) filter.category = category

    const products = await productsModel.find(filter)
    return products

}
const getSingleProductFromDb = async (payload: string) => {
    const product = await productsModel.findById(payload)
    return product

}

const updateProductIntoDb = async (payload: string, data: IProduct) => {
    const findProduct = await productsModel.findById(payload)
    if (!findProduct) {
        throw new AppError(404, 'Product not found')
    }
    const product = await productsModel.findByIdAndUpdate(payload, data, { new: true, runValidators: true })
    return product
}

const deleteProductIntoDb = async (payload: string) => {
    const findProduct = await productsModel.findById(payload)
    if (!findProduct) {
        throw new AppError(404, 'Product not found')
    }
    const product = await productsModel.findByIdAndDelete(payload)
    return product
}
export const productsService = {
    createProductIntoDb,
    getAllProductsFromDb,
    getSingleProductFromDb,
    updateProductIntoDb,
    deleteProductIntoDb
}
