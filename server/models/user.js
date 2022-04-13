const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require('crypto')
const addressSchema = require('./schema/address')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your Name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4, "Name should have more than 4 characters"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Please enter your Email"],
        unique: true,
        trim: true,
        validate: [validator.isEmail, "Please enter a valid Email"],
    },
    password: {
        type: String,
        required: [true, "Please enter your Password"],
        minLength: [8, "Password should be greater than 8 characters"],
        select: false,
        trim: true,
    },
    phone: {
        type: Number,
        required: [true, "Please enter your Phone Number"],
        min: [999999999, "Phone no should be of 10 characters"],
        max: [9999999999, "Phone no should be of 10 characters"]
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    wishlist: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        }
    }],
    cart: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        size: {
            type: Number,
            required: [true, "Please select the size"],
        },
        quantity: {
            type: Number,
            default: 1,
            min: 1
        }
    }],
    address: [addressSchema],
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password"))
        next()
    this.password = await bcrypt.hash(this.password, 10)
})

// JWT token for login
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

// Compare Password
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

// Creating Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
    // Generating token
    const resetToken = crypto.randomBytes(20).toString("hex")

    // Hashing and adding resetPasswordToken to userSchema
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000

    return resetToken
}

module.exports = mongoose.model("User", userSchema)
