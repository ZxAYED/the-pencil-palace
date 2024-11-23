import express from 'express'
import cors from 'cors'

const app = express()

// parser &cors
app.use(cors())

app.get('/', (req, res) => {
  res.send('choleanaaaa!')
})
export default app
