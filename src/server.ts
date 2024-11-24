import app from './app'
import config from './config'
const port = 5000
import mongoose from 'mongoose'

async function main() {
  try {
    await mongoose.connect(config.database_url as string)

    app.listen(config.port, () => {
      console.log(`kemne ki the pencil palace bole choltese on port ${port}`)
    })
  } catch (error) {
    console.log(error)
  }
}
main().catch(err => console.log(err))
