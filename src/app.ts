import express, { ErrorRequestHandler } from 'express'
import cors from 'cors'
import productsRouter from './App/features/products/products.routes'
import globalErrorHandler from './App/Error/GlobalErrorHandlers'
import orderRoutes from './App/features/orders/orders.routes'
import NotFound from './App/Error/NotFound'
import authRouter from './App/features/Auth/auth.routes'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'


const app = express()
app.use(bodyParser.json())
app.use(cookieParser())

app.use(cors())
app.use(express.json())

app.use('/api/products', productsRouter)
app.use('/api/orders', orderRoutes)
app.use('/api/auth', authRouter)




app.get('/', (req, res) => {
  res.send('The Pencil Palace apiiiii is working at shei level')
})

app.use(globalErrorHandler as unknown as ErrorRequestHandler)
app.use(NotFound as unknown as ErrorRequestHandler)

export default app
