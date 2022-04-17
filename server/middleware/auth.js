const jwt = require("jsonwebtoken")
const User = require("../models/user")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middleware/catchAsyncErrors")

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies

    if (!token) {
        return next(new ErrorHandler("Please Login to access this resource", 401))
    }

    const decodedData = await jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decodedData.id, { address: 0, wishlist: 0, cart: 0 })
    next()
})

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role: ${req.user.role}, is not allowed to access this resource`, 403))
        }
        next()
    }
}