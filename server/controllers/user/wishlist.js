const catchAsyncErrors = require("../../middleware/catchAsyncErrors")
const User = require('../../models/user')
const formatUserWishlist = require("../../utils/user/formatUserWishlist")

// Get User Wishlist
exports.getUserWishlist = catchAsyncErrors(async (req, res, next) => {
    let user = await User.findById(req.user.id, { _id: 0, wishlist: 1 }).populate(
        "wishlist.product",
        "name priceSpecs images"
    ).lean()

    user.wishlist = formatUserWishlist(user.wishlist)

    res.status(200).json({
        success: true,
        wishlist: user.wishlist,
    })
})

// Add Product to Wishlist
exports.addToWishlist = catchAsyncErrors(async (req, res, next) => {
    let user = await User.findById(req.user.id)
    const exists = user.wishlist.find(item => item.product.toString() === req.body.product.toString())

    if (!exists) {
        user.wishlist.push(req.body)    // product
    }
    await user.save()

    res.status(200).json({
        success: true,
        wishlist: user.wishlist,
    })
})

// Remove Product from Wishlist
exports.removeFromWishlist = catchAsyncErrors(async (req, res, next) => {
    let user = await User.findById(req.user.id)

    user.wishlist = user.wishlist.filter(item => item.product.toString() !== req.query.id.toString())
    await user.save({ validateBeforeSave: false })

    res.status(200).json({
        success: true,
        message: "Product successfully removed",
        wishlist: user.wishlist,
    })
})
