import productsModel from "../products/products.model";
import IOrder from "./orders.interface";
import OrderModel from "./orders.model";


const createOrderIntoDb = async (payload: IOrder) => {
    const productData = await productsModel.findById(payload.productId);

    if (!productData) {
        const result = {
            status: 404,
            message: 'Product not found',
            success: false,
        }
        return result
    }

    if (!productData.inStock || productData.quantity < payload.quantity) {
        const result = {
            status: 400,
            message: 'Insufficient stock',
            success: false,
        }
        return result
    }

    const quantity = productData.quantity - payload.quantity;
    const updatedData = {
        quantity: quantity,
        inStock: quantity > 0,
    };
    await productsModel.findByIdAndUpdate(payload.productId, updatedData);
    const result = await OrderModel.create(payload);
    return result;
}


const generateRevenueFromDb = async () => {
    const result = await OrderModel.aggregate([
        {
            $addFields: {
                total: { $multiply: ['$totalPrice', '$quantity'] },
            },
        },
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: '$total' },
            },
        },
    ]);

    if (result.length > 0) {
        const totalRevenue = result[0].totalRevenue;
        const output = {
            message: 'Revenue calculated successfully',
            success: true,
            data: { totalRevenue },
        }
        return output
    } else {
        const output = {
            message: 'No revenue data found',
            success: true,
            data: { totalRevenue: 0 },
        };
        return output
    }

}
const generateRevenueForUser = async (userEmail: string) => {
    const result = await OrderModel.aggregate([

        {
            $match: { email: userEmail }
        },

        {
            $addFields: {
                total: { $multiply: ['$totalPrice', '$quantity'] }
            }
        },
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: '$total' }
            }
        }
    ]);

    if (result.length > 0) {
        const totalRevenue = result[0].totalRevenue;
        return {
            message: 'Revenue calculated successfully',
            success: true,
            data: { totalRevenue },
        };
    } else {
        return {
            message: 'No revenue data found for this user',
            success: true,
            data: { totalRevenue: 0 },
        };
    }
};


const getAllOrderIntoDb = async () => {
    const result = await OrderModel.find()
    return result
}
export const orderService = {
    createOrderIntoDb,
    generateRevenueFromDb,
    generateRevenueForUser,
    getAllOrderIntoDb
}
