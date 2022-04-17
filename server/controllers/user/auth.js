const catchAsyncErrors = require("../../middleware/catchAsyncErrors")
const User = require('../../models/user')
const ErrorHandler = require('../../utils/errorHandler')
const sendToken = require("../../utils/user/jwtToken")
const sendEmail = require("../../utils/sendEmail")
const crypto = require('crypto')
const jwt = require("jsonwebtoken")

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
    }, { addresses: 0, cart: 0, wishlist: 0 })

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
