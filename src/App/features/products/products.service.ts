/* eslint-disable @typescript-eslint/no-explicit-any */
import { IProduct } from "./products.interface"
import productsModel from "./products.model"


const createProductIntoDb = async (payload: IProduct) => {

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
export const productsService = {
    createProductIntoDb,
    getAllProductsFromDb,
    getSingleProductFromDb
}
