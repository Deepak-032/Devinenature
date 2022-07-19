const catchAsyncErrors = require("../../middleware/catchAsyncErrors")
const User = require('../../models/user')
const formatUserWishlist = require("../../utils/user/formatUserWishlist")

// Get User Wishlist
exports.getUserWishlist = catchAsyncErrors(async (req, res, next) => {
    let user = await User.findById(req.user.id, { wishlist: 1 }).populate(
        "wishlist.product",
        "name priceSpecs images ratings"
    )

    let isProductDeleted = false
    let filtered = user.wishlist.filter(item => {
        if (item.product === null)
            isProductDeleted = true
        return item.product
    })

    if (isProductDeleted) {
        user.wishlist = filtered
        await user.save()
    }

    const wishlist = formatUserWishlist(user.wishlist)

    res.status(200).json({
        success: true,
        wishlist,
    })
})

// Add Product to Wishlist
exports.addToWishlist = catchAsyncErrors(async (req, res, next) => {
    let user = await User.findById(req.user.id, { wishlist: 1 }).populate(
        "wishlist.product",
        "name priceSpecs images ratings"
    )

    const exists = user.wishlist.find(item => item.product._id.toString() === req.body.product.toString())

    if (!exists) {
        user.wishlist.push(req.body)    // product
        
        await user.save()
        user = await user.populate(
            "wishlist.product",
            "name priceSpecs images ratings"
        )
    }

    const wishlist = formatUserWishlist(user.wishlist)

    res.status(200).json({
        success: true,
        wishlist,
    })
})

// Remove Product from Wishlist
exports.removeFromWishlist = catchAsyncErrors(async (req, res, next) => {
    let user = await User.findById(req.user.id, { wishlist: 1 }).populate(
        "wishlist.product",
        "name priceSpecs images ratings"
    )

    user.wishlist = user.wishlist.filter(item => item.product._id.toString() !== req.query.product.toString())
    await user.save()

    const wishlist = formatUserWishlist(user.wishlist)
    
    res.status(200).json({
        success: true,
        wishlist,
    })
})
