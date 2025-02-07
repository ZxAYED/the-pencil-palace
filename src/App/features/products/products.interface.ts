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
  profileImage: string
  inStock: boolean,
  isFeatured: boolean,
  rating: number
}
export interface ProductFilter {
  name?: string;
  brand?: string;
  category?: string;
}