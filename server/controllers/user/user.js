const catchAsyncErrors = require("../../middleware/catchAsyncErrors")
const User = require('../../models/user')
const ApiFeatures = require("../../utils/apiFeatures")
const ErrorHandler = require('../../utils/errorHandler')

// Get User Details
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id, {
        name: 1,
        email: 1,
        phone: 1,
        role: 1
    }).lean()

    res.status(200).json({
        success: true,
        user,
    })
})

// Update User Profile
exports.updateUserProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        // email: req.body.email,
        phone: req.body.phone
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    })

    res.status(200).json({
        success: true,
        message: "Your profile updated successfully.",
    })
})

// Get All Users -- Admin
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
    const resultPerPage = req.query.resultPerPage || 12

    const apiFeatures = new ApiFeatures(User.find({}, {
        name: 1,
        email: 1,
        role: 1,
        phone: 1,
        createdAt: 1
    }), req.query)
        .search()
        .pagination(resultPerPage)

    const users = await apiFeatures.query.lean()

    const countDocs = new ApiFeatures(User.find(), req.query).search().filter()
    const usersCount = await countDocs.query.countDocuments()

    res.status(200).json({
        success: true,
        users,
        usersCount
    })
})

// Get User Details -- Admin
exports.getUserDetailsAdmin = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id, {
        name: 1,
        email: 1,
        phone: 1,
        createdAt: 1,
        role: 1
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
