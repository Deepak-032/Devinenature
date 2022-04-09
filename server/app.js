const express = require("express")
const errorMiddleware = require("./middleware/error")
const app = express()
const cookieParser = require('cookie-parser')

app.use(express.json())
app.use(cookieParser())

// Routes
app.use('/api/dk1', require('./routes/product'))
app.use('/api/dk1', require('./routes/user'))

// middleware for errors, error handler middleware must be placed after the route handlers and other middlewares
app.use(errorMiddleware)

module.exports = app
