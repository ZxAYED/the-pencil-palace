import app from './app'
import config from './config'

import mongoose from 'mongoose'

async function main() {
  try {
    await mongoose.connect(config.database_url as string)

    app.listen(config.port, () => {
      console.log(
        `kemne ki the pencil palace bole choltese on port ${config.port}`,
      )
    })
  } catch (error) {
    console.log(error)
  }
}
main().catch(error => console.log(error))
