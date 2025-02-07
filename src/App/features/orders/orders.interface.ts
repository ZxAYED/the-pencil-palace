import { Types } from "mongoose"

interface IOrder {
  email: string
  products: {
    product: Types.ObjectId,
    quantity: number
  }[]
  totalPrice: number

}


export default IOrder
