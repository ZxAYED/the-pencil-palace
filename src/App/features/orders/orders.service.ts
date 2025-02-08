import AppError from "../../Error/AppError"
import productsModel from "../products/products.model"
import { makePayment, verifyPayment } from "./order.utils"
import IOrder from "./orders.interface"
import OrderModel from "./orders.model"
import { PaymentRequest, PaymentResponse, VerificationResponse } from "Shurjopay"

const createOrderIntoDb = async (payload: IOrder) => {
    const productIds = payload.products.map((product) => product.product)
    const quantities = payload.products.map((product) => product.quantity)


    const productDataList = await productsModel.find({ _id: { $in: productIds } })

    if (!productDataList.length) {
        return {
            status: 404,
            message: 'Products not found',
            success: false,
        }
    }


    const insufficientStock = productDataList.filter((productData, index) =>
        !productData.inStock || productData.quantity < quantities[index]
    )

    if (insufficientStock.length > 0) {
        return {
            status: 400,
            message: `Insufficient stock for product: ${insufficientStock.map(item => item.name).join(', ')}`,
            success: false,
        }
    }


    await Promise.all(productDataList.map((productData, index) => {
        const updatedQuantity = productData.quantity - quantities[index]
        return productsModel.findByIdAndUpdate(productData._id, {
            quantity: updatedQuantity,
            inStock: updatedQuantity > 0,
        })
    }))

    const result = await OrderModel.create(payload)
    return result
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
    ])

    if (result.length > 0) {
        const totalRevenue = result[0].totalRevenue
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
        }
        return output
    }
}

const generateRevenueForUser = async (userEmail: string) => {
    const result = await OrderModel.aggregate([
        {
            $match: { email: userEmail },
        },
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
    ])

    if (result.length > 0) {
        const totalRevenue = result[0].totalRevenue
        return {
            message: 'Revenue calculated successfully',
            success: true,
            data: { totalRevenue },
        }
    } else {
        return {
            message: 'No revenue data found for this user',
            success: true,
            data: { totalRevenue: 0 },
        }
    }
}

const makePaymentIntoDb = async (payload: PaymentRequest, clientIp: string): Promise<PaymentResponse> => {
    const order = await OrderModel.findById(payload.order_id)
    if (!order) {
        throw new AppError(404, 'Order not found')
    }

    const discount = payload?.discount_amount || 0
    const discountedAmount = payload.amount - discount


    const surjoPayload = {
        orderId: payload.order_id,
        email: payload.customer_email,
        quantity: payload.quantity,
        totalPrice: discountedAmount,
        phone: payload.customer_phone,
        address: payload.customer_address,
        city: payload.customer_city,
        client_ip: clientIp,
    }

    const result = await makePayment(surjoPayload) as PaymentResponse
    if (result?.transactionStatus) {
        await OrderModel.findByIdAndUpdate(payload.order_id, { payment: { status: 'Initiated', OrderId: result.sp_order_id } }, { new: true, runValidators: true })
    }

    return result
}

const verifyPaymentIntoDb = async (orderId: string) => {
    const result = await verifyPayment(orderId) as VerificationResponse[]
    if (result?.[0]?.transaction_status) {
        await OrderModel.findByIdAndUpdate(orderId, {
            payment: {
                status: result?.[0]?.bank_status === 'Success' ? "Paid" : result?.[0]?.bank_status === 'Failed' ? "Pending" : result?.[0]?.bank_status === 'Cancel' ? "Cancelled" : "Initiated",
                sp_code: result?.[0]?.sp_code,
                sp_message: result?.[0]?.sp_message,
                method: result?.[0]?.method,
                date_time: result?.[0]?.date_time,
                bank_status: result?.[0]?.bank_status,
            },
            status: "Processing",
        }, { new: true, runValidators: true })
    }
    return result


}


const cancelOrderIntoDb = async (orderId: string) => {
    const order = await OrderModel.findById(orderId)
    if (!order) {
        throw new AppError(404, 'Order not found')
    }
    await OrderModel.findByIdAndDelete(orderId)
    const updatedOrder = await OrderModel.findById(orderId)
    return updatedOrder
}

const getAllOrderIntoDb = async () => {
    const result = await OrderModel.find()
    return result
}

export const orderService = {
    createOrderIntoDb,
    generateRevenueFromDb,
    generateRevenueForUser,
    getAllOrderIntoDb,
    cancelOrderIntoDb,
    makePaymentIntoDb,
    verifyPaymentIntoDb,
}
