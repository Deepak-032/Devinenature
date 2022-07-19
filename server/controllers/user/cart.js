const catchAsyncErrors = require("../../middleware/catchAsyncErrors")
const User = require('../../models/user')
const formatUserCart = require("../../utils/user/formatUserCart")
const calcOrderPrice = require('../../utils/calcOrderPrice')

// Get User Cart
exports.getUserCart = catchAsyncErrors(async (req, res, next) => {
    let user = await User.findById(req.user.id, { cart: 1 }).populate(
        "cart.product",
        "name priceSpecs images"
    )

    // If some products deleted by admin then populate will fill null in product and we delete it from the user cart
    let isProductDeleted = false
    let filtered = user.cart.filter(item => {
        if (item.product === null)
            isProductDeleted = true
        return item.product
    })

    if (isProductDeleted) {
        user.cart = filtered
        await user.save()
    }

    const cart = formatUserCart(user.cart)
    // const priceDetails = calcOrderPrice(user.cart)

    res.status(200).json({
        success: true,
        cart,
        // priceDetails
    })
})

// Add Product to Cart
exports.addToCart = catchAsyncErrors(async (req, res, next) => {
    const size = Number(req.body.size)
    const quantity = Number(req.body.quantity) || 1
    let user = await User.findById(req.user.id, { cart: 1 }).populate(
        "cart.product",
        "name priceSpecs images"
    )

    const exists = user.cart.find(item => {
        if (item.product._id.toString() === req.body.product.toString() && item.size === size) {
            const temp = item.product.priceSpecs.find(i => i.size === item.size)
            
            if (temp.stock >= item.quantity + quantity) {
                item.quantity += quantity
            } else {
                item.quantity = temp.stock
            }
            
            return true
        }
    })

    if (!exists) {
        user.cart.push(req.body)    // product size quantity
    }

    user = await user.save()
    user = await user.populate(
        "cart.product",
        "name priceSpecs images"
    )

    const cart = formatUserCart(user.cart)

    res.status(200).json({
        success: true,
        cart,
    })
})

// Update Product quantity/ size
exports.updateCart = catchAsyncErrors(async (req, res, next) => {
    const size = Number(req.body.size)
    const quantity = Number(req.body.quantity) || 1
    let user = await User.findById(req.user.id, { cart: 1 }).populate(
        "cart.product",
        "name priceSpecs images"
    )

    user.cart.find(item => {
        if (item._id.toString() === req.body._id.toString()) {
            if (size) item.size = size
            item.quantity = quantity
            return true
        }
    })

    await user.save()

    const cart = formatUserCart(user.cart)

    res.status(200).json({
        success: true,
        cart,
    })
})

// Remove Product from Cart
exports.removeFromCart = catchAsyncErrors(async (req, res, next) => {
    let user = await User.findById(req.user.id, { cart: 1 }).populate(
        "cart.product",
        "name priceSpecs images"
    )

    user.cart = user.cart.filter(item => item._id.toString() !== req.query._id.toString())

    await user.save()

    const cart = formatUserCart(user.cart)

    res.status(200).json({
        success: true,
        cart,
    })
})
