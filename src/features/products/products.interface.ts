export interface IProduct {
  name: string
  brand: string
  price: number
  category:
  | 'Writing'
  | 'Office Supplies'
  | 'Art Supplies'
  | 'Educational'
  | 'Technology'
  description: string
  quantity: number
  photo: number
  inStock: boolean
}
export interface ProductFilter {
  name?: string;
  brand?: string;
  category?: string;
}