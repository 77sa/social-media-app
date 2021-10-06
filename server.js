require('dotenv').config()
const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')
const errorHandler = require('./middleware/errorHandler')
const app = express()

connectDB()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/auth', require('./routes/auth'))
app.use('/api/posts', require('./routes/posts'))

app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log('Server started'))