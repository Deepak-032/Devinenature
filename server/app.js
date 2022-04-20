const express = require("express")
const errorMiddleware = require("./middleware/error")
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const app = express()

app.use(fileUpload({ createParentPath: true }))
app.use(express.json())
app.use(cookieParser())

// Routes
app.use('/api/dk1', require('./routes/product'))
app.use('/api/dk1', require('./routes/user'))
app.use('/api/dk1', require('./routes/order'))

// middleware for errors, error handler middleware must be placed after the route handlers and other middlewares
app.use(errorMiddleware)

module.exports = app
