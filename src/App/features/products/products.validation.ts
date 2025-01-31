import { z } from 'zod'

const createProductsValidationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  brand: z.string().min(1, 'Brand is required'),
  price: z.number().min(0, 'Price must be a positive number'),
  category: z.enum([
    'Writing',
    'Office Supplies',
    'Art Supplies',
    'Educational',
    'Technology',
  ]),
  description: z.string().min(1, 'Description is required'),
  quantity: z.number().int().min(0, 'Quantity must be a positive integer'),
  photo: z.string().min(1, 'Photo is required'),
  inStock: z.boolean(),
})

const updateProductsValidationSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  brand: z.string().min(1, 'Brand is required').optional(),
  price: z.number().min(0, 'Price must be a positive number').optional(),
  category: z.enum([
    'Writing',
    'Office Supplies',
    'Art Supplies',
    'Educational',
    'Technology',
  ]).optional(),
  description: z.string().min(1, 'Description is required').optional(),
  quantity: z.number().int().min(0, 'Quantity must be a positive integer').optional(),
  photo: z.string().min(1, 'Photo is required').optional(),
  inStock: z.boolean().optional(),
})
export { createProductsValidationSchema, updateProductsValidationSchema }
