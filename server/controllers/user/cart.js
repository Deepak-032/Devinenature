const catchAsyncErrors = require("../../middleware/catchAsyncErrors")
const User = require('../../models/user')
const formatUserCart = require("../../utils/user/formatUserCart")

// Get User Cart
exports.getUserCart = catchAsyncErrors(async (req, res, next) => {
    let user = await User.findById(req.user.id, { _id: 0, cart: 1 }).populate(
        "cart.product",
        "name priceSpecs stock images"
    ).lean()

    user.cart = formatUserCart(user.cart)

    res.status(200).json({
        success: true,
        cart: user.cart
    })
})

// Add Product to Cart or Update Product quantity/ size
exports.addToCart = catchAsyncErrors(async (req, res, next) => {
    const quantity = Number(req.body.quantity)
    const size = Number(req.body.size)
    let user = await User.findById(req.user.id)

    const exists = user.cart.find(item => {
        if (item.product.toString() === req.body.product.toString()) {
            size && (item.size = size)
            quantity ? item.quantity = quantity : item.quantity += 1
            return true
        }
    })

    if (!exists) {
        user.cart.push(req.body)    // product size quantity
    }
    await user.save()

    res.status(200).json({
        success: true,
        cart: user.cart,
    })
})

// Remove Product from Cart
exports.removeFromCart = catchAsyncErrors(async (req, res, next) => {
    let user = await User.findById(req.user.id)

    user.cart = user.cart.filter(item => item.product.toString() !== req.query.id.toString())
    await user.save({ validateBeforeSave: false })

    res.status(200).json({
        success: true,
        message: "Product successfully removed",
        cart: user.cart,
    })
})
