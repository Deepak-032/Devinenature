const mongoose = require("mongoose")
const addressSchema = require("./schema/address")

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    orderItems: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        discount: {
            type: Number,
            required: true,
            default: 0,
        },
        quantity: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
    }],
    paymentDetails: {
        id: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
        mode: {
            type: String,
            required: true,
        },
        paidAt: {
            type: Date,
            required: true,
        },
    },
    priceDetails: {
        sum: {
            type: Number,
            required: true,
            default: 0,
        },
        discount: {
            type: Number,
            required: true,
            default: 0,
        },
        tax: {
            type: Number,
            required: true,
            default: 0,
        },
        shipping: {
            type: Number,
            required: true,
            default: 0,
        },
        total: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    status: {
        type: String,
        required: true,
        default: "Processing",
    },
    shippingDetails: addressSchema,
    deliveredAt: Date,
    cancelledAt: Date,
    returnedAt: Date,
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model("Order", orderSchema)
