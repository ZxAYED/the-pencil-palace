import express, { Application, RequestHandler } from 'express'
import cors from 'cors'
import productsRouter from './App/features/products/products.routes'
import globalErrorHandler from './App/Error/GlobalErrorHandlers'
import orderRoutes from './App/features/orders/orders.routes'
import NotFound from './App/Error/NotFound'
import authRouter from './App/features/Auth/auth.routes'

import adminRouter from './App/features/admin/admin.routes'

import cookieParser from 'cookie-parser'


const app: Application = express()
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true
}))
app.use(express.json());

app.use('/api/products', productsRouter)
app.use('/api/orders', orderRoutes)
app.use('/api/auth', authRouter)
app.use('/api/admin', adminRouter)



app.get('/', (req, res) => {
  res.send('The Pencil Palace apiiiii is working at shei level')
})

app.use(globalErrorHandler as unknown as RequestHandler)
app.use(NotFound as unknown as RequestHandler)

export default app
