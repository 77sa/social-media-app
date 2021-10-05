require('dotenv').config()
const express = require('express')
const connectDB = require('./config/db')
const app = express()

connectDB()

const PORT = process.env.PORT || 5001
app.listen(PORT, () => console.log('Server started'))