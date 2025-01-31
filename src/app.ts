import express, { ErrorRequestHandler } from 'express'
import cors from 'cors'
import productsRouter from './App/features/products/products.routes'
import globalErrorHandler from './App/Error/GlobalErrorHandlers'
import orderRoutes from './App/features/orders/orders.routes'
import NotFound from './App/Error/NotFound'



const app = express()


app.use(cors())
app.use(express.json())

app.use('/api/products', productsRouter)
app.use('/api/orders', orderRoutes)

app.get('/', (req, res) => {
  res.send('The Pencil Palace apiiiii is working at shei level')
})

app.use(globalErrorHandler as unknown as ErrorRequestHandler)
app.use(NotFound as unknown as ErrorRequestHandler)

export default app
