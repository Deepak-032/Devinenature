const Order = require("../models/order")
const Product = require("../models/product")
const User = require("../models/user")
const ErrorHander = require("../utils/errorHandler")
const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const calcOrderPrice = require('../utils/calcOrderPrice')
const formatUserCart = require("../utils/user/formatUserCart")


// Create new Order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
    let { shippingDetails, paymentDetails } = req.body
    paymentDetails.paidAt = Date.now()

    let user = await User.findById(req.user.id, { cart: 1 }).populate(
        "cart.product",
        "name priceSpecs stock images"
    ).lean()

    user.cart = formatUserCart(user.cart)
    const priceDetails = calcOrderPrice(user.cart)

    const order = await Order.create({
        user: req.user.id,
        orderItems: user.cart,
        paymentDetails,        
        shippingDetails,
        priceDetails
    })

    res.status(201).json({
        success: true,
        order,
    })
})

// Get All Orders
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({ user: req.user.id }, { deliveredAt: 1, orderItems: 1, orderStatus: 1 })

    res.status(200).json({
        success: true,
        orders,
    })
})

// Get Order Details
exports.myOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id, { user: 0 })

    res.status(200).json({
        success: true,
        order,
    })
})

// Cancel Order
// exports.cancelOrder = catchAsyncErrors(async (req, res, next) => {
//     let order = await Order.findById(req.params.id)

//     if (order.status !== "Processing") {
//         return next(new ErrorHander("Order cannot be cancelled now", 400))
//     }

//     order.status = "Cancelled"
//     order.cancelledAt = Date.now()

//     await order.save({ validateBeforeSave: false })

//     // return the payment if mode is online
//     // function to refund the money

//     res.status(200).json({
//         success: true,
//         message: "Order Cancelled Successfully",
//     })
// })

// Return Order
// exports.returnOrder = catchAsyncErrors(async (req, res, next) => {
//     let order = await Order.findById(req.params.id)

//     if (order.status !== "Delivered") {
//         return next(new ErrorHander("Order must be delivered to return", 400))
//     }

//     // function to refund the money

//     order.status = "Returned"
//     order.returnedAt = Date.now()
//     await order.save({ validateBeforeSave: false })

//     res.status(200).json({
//         success: true,
//         message: "Order returned Successfully",
//     })
// })

// Get All Orders -- Admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({}, { user: 1, status: 1, priceDetails: { total: 1 }, createdAt: 1, deliveredAt: 1 }).populate("user", "name")

    const totalSale = orders.reduce((amount, order) => amount + order.priceDetails.total, 0)

    res.status(200).json({
        success: true,
        totalSale,
        orders,
    })
})

// Get Order Details -- Admin
exports.getOrderDetails = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate(
        "user",
        "name email phone"
    )

    if (!order) {
        return next(new ErrorHander("Order not found", 404))
    }

    res.status(200).json({
        success: true,
        order,
    })
})

// Update Order Status -- Admin
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id)

    if (!order) {
        return next(new ErrorHander("Order not found", 404))
    }

    if (order.status === "Delivered") {
        return next(new ErrorHander("Order has already been delivered", 400))
    }

    if (order.status === "Shipped" && req.body.status === "Shipped") {
        return next(new ErrorHander("Order has already been shipped", 400))
    }

    order.status = req.body.status

    if (order.status === "Shipped") {
        order.orderItems.forEach(async order => {
            await updateStock(order.product, order.quantity)
        })
    }

    if (order.status === "Delivered") {
        order.deliveredAt = Date.now()
    }

    await order.save({ validateBeforeSave: false })
    res.status(200).json({
        success: true,
    })
})

// Delete Order -- Admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id)

    if (!order) {
        return next(new ErrorHander("Order not found", 404))
    }

    await order.remove()

    res.status(200).json({
        success: true,
    })
})

async function updateStock(id, quantity) {
    const product = await Product.findById(id)
    product.stock -= quantity

    await product.save({ validateBeforeSave: false })
}
