import express from 'express'
import cors from 'cors'
import productsRouter from './features/products/products.routes'
import orderRouter from './features/orders/orders.router'

const app = express()

// parser &cors
app.use(cors())
app.use(express.json())

app.use('/api/products', productsRouter);
app.use('/api/orders', orderRouter);



app.get('/', (req, res) => {
  res.send('The Pencil Palace apiiiii is working at shei level')
})




export default app

