const catchAsyncErrors = require("../../middleware/catchAsyncErrors")
const User = require('../../models/user')

// Get All Addresses
exports.getAllAddresses = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id, { addresses: 1 })

    res.status(200).json({
        success: true,
        addresses: user.addresses
    })
})

// Add new Address
exports.addNewAddress = catchAsyncErrors(async (req, res, next) => {
    let user = await User.findById(req.user.id, { addresses: 1 })

    user.addresses.push(req.body)
    await user.save()

    res.status(201).json({
        success: true,
        message: "Address added successfully",
        addresses: user.addresses
    })
})

// Update User Address
exports.updateUserAddress = catchAsyncErrors(async (req, res, next) => {
    const { name, houseNo, pincode, street, landmark, city, state, country, phoneNo, _id } = req.body
    let user = await User.findById(req.user.id, { addresses: 1 })

    user.addresses.find(address => {
        if (address._id.toString() === _id.toString()) {
            address.name = name
            address.houseNo = houseNo
            address.pincode = pincode
            address.street = street
            address.landmark = landmark
            address.city = city
            address.state = state
            address.country = country
            address.phoneNo = phoneNo
            return true
        }
    })
    await user.save()

    res.status(200).json({
        success: true,
        message: "Address updated successfully",
        addresses: user.addresses
    })
})

// Delete User Address
exports.deleteUserAddress = catchAsyncErrors(async (req, res, next) => {
    let user = await User.findById(req.user.id, { addresses: 1 })

    user.addresses = user.addresses.filter(address => address._id.toString() !== req.query.address.toString())
    await user.save({ validateBeforeSave: false })

    res.status(200).json({
        success: true,
        message: "Address deleted successfully",
        addresses: user.addresses
    })
})
