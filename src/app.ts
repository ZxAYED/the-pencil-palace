import express from 'express'
import cors from 'cors'
import productsRouter from './App/features/products/products.routes'

import orderRoutes from './App/features/orders/orders.routeS'



const app = express()


app.use(cors())
app.use(express.json())

app.use('/api/products', productsRouter)
app.use('/api/orders', orderRoutes)

app.get('/', (req, res) => {
  res.send('The Pencil Palace apiiiii is working at shei level')
})

export default app
