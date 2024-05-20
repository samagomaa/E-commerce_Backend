import express from 'express'
import { dbConnection } from './database/dbConnection.js'
import { bootstrap } from './src/modules/index.routes.js'
import dotenv from 'dotenv'

dotenv.config()
const app = express()
const port = process.env.PORT

app.use(express.json())
app.use('/uploads' , express.static('uploads')) 
bootstrap(app,express)
dbConnection()



app.listen(port, () => console.log(`server is running...`))
