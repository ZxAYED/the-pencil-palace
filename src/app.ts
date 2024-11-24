import express from 'express'
import cors from 'cors'
import userRouter from './features/products/products.routes'

const app = express()

// parser &cors
app.use(cors())
app.use(express.json())

app.use('/api/products', userRouter);

app.use((req, res, next) => {
  res.status(404).send({ error: 'Route not found' });
});



app.get('/', (req, res) => {
  res.send('choleanaaaa!')
})





export default app

