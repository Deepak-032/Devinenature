const mongoose = require("mongoose")

const addressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    address: [
        {
            houseNo: {
                type: String,
                required: true,
            },
            pincode: {
                type: Number,
                required: true,
            },
            street: {
                type: String,
                required: true,
            },
            landmark: {
                type: String,
                required: true,
            },
            city: {
                type: String,
                required: true,
            },
            state: {
                type: String,
                required: true,
            },
            country: {
                type: String,
                required: true,
            },
            phoneNo: {
                type: Number,
                required: true,
            },
            defaultAddress: {
                type: Boolean,
                required: true,
                default: false,
            },
            deliveryInstructions: String,
        }
    ],
})

module.exports = mongoose.model("Address", addressSchema)
