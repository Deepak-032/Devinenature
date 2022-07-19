const express = require("express")
const errorMiddleware = require("./middleware/error")
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const path = require('path')
const app = express()

app.use(fileUpload({ createParentPath: true }))
app.use(express.json())
app.use(cookieParser())

// Routes
app.use('/api/v1', require('./routes/product'))
app.use('/api/v1', require('./routes/user'))
app.use('/api/v1', require('./routes/order'))
app.use('/api/v1', require('./routes/shippingCost'))
app.use('/api/v1', require('./routes/banner'))
app.use('/api/v1', require('./routes/coupon'))

app.use(express.static(path.join(__dirname, "../build")))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../build/index.html"))
})

// middleware for errors, error handler middleware must be placed after the route handlers and other middlewares
app.use(errorMiddleware)

module.exports = app
