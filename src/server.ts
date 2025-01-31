/* eslint-disable no-console */
import app from './app'
import config from './App/config'

import mongoose from 'mongoose'

async function main() {
  try {
    await mongoose.connect(config.database_url as string)

    app.listen(config.port, () => {
      console.log(
        ` the pencil is flying on port ${config.port}`,
      )
    })
  } catch (error) {
    console.log(error)
  }
}
main().catch(error => console.log(error))
