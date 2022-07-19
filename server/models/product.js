const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter product Name"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Please enter product Description"],
    },
    about: {
        type: String,
        required: [true, "Please enter product About"],
    },
    instructions: {
        type: String,
        required: [true, "Please enter product Instructions"],
    },
    priceSpecs: {
        type: [{
            size: {
                type: Number,
                required: [true, "Please enter product Size"],
            },
            mrp: {
                type: Number,
                required: [true, "Please enter product Price"],
            },
            offerPrice: {
                type: Number,
                required: [true, "Please enter offer Price, enter 0 if there is no discount"],
                default: 0,
            },
            stock: {
                type: Number,
                required: [true, "Please enter product Stock"],
                max: [9999, "Stock cannot exceed 4 characters"],
                min: [0, "Stock cannot be negative"],
                default: 1,
            },
        }],
        validate: [v => Array.isArray(v) && v.length > 0, "Please enter price specification"]
    },
    images: {
        type: [String],
        validate: [v => Array.isArray(v) && v.length > 0, "Please add atleast one image"]
    },
    category: {
        type: String,
        required: [true, "Please enter product Category"],
        index: true,
    },
    ratings: {
        type: Number,
        default: 0,
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
    reviews: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            min: [1, "Please add overall ratings"],
            required: [true, "Please add overall ratings"],
        },
        comment: {
            type: String,
            required: [true, "Please add a short message"],
            maxLength: 50,
        },
        description: String,
        createdAt: {
            type: Date,
            default: Date.now,
        },
    }],
    user: { // User to check who created this product
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    bestSelling: {
        type: Boolean,
        default: false,
        index: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model("Product", productSchema)
