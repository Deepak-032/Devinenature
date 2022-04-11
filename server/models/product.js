const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter product Name"],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, "Please enter product Price"],
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
    stock: {
        type: Number,
        required: [true, "Please enter product Stock"],
        maxLength: [4, "Stock cannot exceed 4 characters"],
        default: 1,
    },
    sizes: {
        type: [Number],
        validate: [v => Array.isArray(v) && v.length > 0, "Please enter product Sizes"]
    },
    images: {
        type: [{
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        }],
        validate: [v => Array.isArray(v) && v.length > 0, "Please add atleast one image"]
    },
    discount: {
        type: Number,
        default: 0,
    },
    category: {
        type: String,
        required: [true, "Please enter product Category"],
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
            required: true,
        },
        comment: {
            type: String,
            required: true,
            maxLength: 50,
        },
        description: {
            type: String
        },
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
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model("Product", productSchema)
