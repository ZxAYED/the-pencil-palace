import express from 'express'
import cors from 'cors'
import productsRouter from './features/products/products.routes'

const app = express()

// parser &cors
app.use(cors())
app.use(express.json())

app.use('/api/products', productsRouter);





app.get('/', (req, res) => {
  res.send('choleanaaaa!')
})


// 


export default app

