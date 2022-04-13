const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const User = require('../models/user')
const Product = require('../models/product')
const ErrorHandler = require('../utils/errorHandler')
const sendToken = require("../utils/jwtToken")
const sendEmail = require("../utils/sendEmail")
const crypto = require('crypto')
const jwt = require("jsonwebtoken")
const formatUserCart = require("../utils/user/formatUserCart")
const formatUserWishlist = require("../utils/user/formatUserWishlist")

// Register new User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password, phone } = req.body

    // checking if user already exists
    const user = await User.findOne({ email }).lean()

    if (user) {
        return next(new ErrorHandler("Entered email already exists", 400))
    }

    const token = jwt.sign({ name, email, password, phone }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE_EMAIL_VERIFICATION
    })
    const emailVerificationUrl = `${req.protocol}://${req.get('host')}/api/dk1/register/verify/${token}`
    const message = `Click on the link given below to verify your email address:\n\n${emailVerificationUrl}\n\nIf you have not requested this email then, please ignore it.`

    await sendEmail({
        email,
        subject: `User Email Verification`,
        message,
    })

    res.status(200).json({
        success: true,
        message: `Link sent to ${email}, please verify it to create your account`,
    })
})

// Register Verified User
exports.registerVerifiedUser = catchAsyncErrors(async (req, res, next) => {
    const decodedData = await jwt.verify(req.params.token, process.env.JWT_SECRET)

    const user = await User.create(decodedData)

    sendToken(user, 201, res)
})

// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
        return next(new ErrorHandler("Please enter Email & Password", 400))
    }

    const user = await User.findOne({ email }, { name: 1, password: 1 })

    if (!user) {
        return next(new ErrorHandler("Email or Password is incorrect"))
    }

    const isPasswordMatched = await user.comparePassword(password)

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Email or Password is incorrect", 401))
    }

    sendToken(user, 200, res)
})

// Logout User
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
    const options = {
        httpOnly: true,
        expires: new Date(Date.now())
    }

    res.status(200).cookie('token', null, options).json({
        success: true,
        message: "Logged Out"
    })
})

// Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })

    if (!user) {
        return next(new ErrorHandler("User not found", 404))
    }

    // Getting Reset Password Token
    const resetToken = user.getResetPasswordToken()

    await user.save({ validateBeforeSave: false })

    const resetPasswordUrl = `${req.protocol}://${req.get('host')}/api/dk1/password/reset/${resetToken}`

    const message = `Your reset password token is: \n\n${resetPasswordUrl}\n\nIf you have not requested this email then, please ignore it.`

    try {
        await sendEmail({
            email: user.email,
            subject: `${process.env.COMPANY_NAME} User Password Recovery`,
            message,
        })

        res.status(200).json({
            success: true,
            message: `Link sent to ${user.email}, click on link to reset your password`,
        })
    } catch (error) {
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined

        await user.save({ validateBeforeSave: false })
        return next(new ErrorHandler(error.message, 500))
    }

})

// Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex")

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })

    if (!user) {
        return next(new ErrorHandler("Reset Password Token is invalid or has been expired", 400))
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password does not matched", 400))
    }

    user.password = req.body.newPassword
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined
    await user.save()

    sendToken(user, 200, res)
})

// Get User Details
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id, {
        role: 0,
        wishlist: 0,
        cart: 0,
        resetPasswordToken: 0,
        resetPasswordExpire: 0,
    }).lean()

    res.status(200).json({
        success: true,
        user,
    })
})

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

// Add Product to Cart or Update Product quantity
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

// Change User Password
exports.changeUserPassword = catchAsyncErrors(async (req, res, next) => {
    const { oldPassword, newPassword, confirmPassword } = req.body

    const user = await User.findById(req.user.id, { name: 1, password: 1 })

    const isPasswordMatched = await user.comparePassword(oldPassword)

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Old Password is incorrect", 401))
    }

    if (newPassword !== confirmPassword) {
        return next(new ErrorHandler("Password does not matched", 400))
    }

    user.password = newPassword
    await user.save()

    res.status(200).json({
        success: true,
        message: "Password successfully changed",
    })
})

// Update User Profile
exports.updateUserProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    })

    res.status(200).json({
        success: true,
        user,
    })
})

// Get All Users -- Admin
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find({}, { name: 1, email: 1, role: 1, createdAt: 1 }).lean()

    res.status(200).json({
        success: true,
        users,
        usersCount: users.length
    })
})

// Get User Details -- Admin
exports.getUserDetailsAdmin = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id, { 
        wishlist: 0, 
        cart: 0, 
        resetPasswordToken: 0, 
        resetPasswordExpire: 0,
        address: 0
    }).lean()

    if (!user) {
        return next(new ErrorHandler("User not found", 404))
    }

    res.status(200).json({
        success: true,
        user,
    })
})

// Update User Role -- Admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id, { role: req.body.role }, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    })

    if (!user) {
        return next(new ErrorHandler("User not found", 404))
    }

    res.status(200).json({
        success: true,
        user
    })
})

// Delete User --Admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id)

    if (!user) {
        return next(new ErrorHandler("User not found", 404))
    }

    await user.remove()

    res.status(200).json({
        success: true,
        message: "User Deleted Successfully",
    })
})
