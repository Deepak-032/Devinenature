const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const Product = require('../models/product')
const ErrorHandler = require('../utils/errorHandler')
const ApiFeatures = require('../utils/apiFeatures')

// Get all products
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
    const resultPerPage = 5
    const productsCount = await Product.countDocuments();
    const apiFeatures = new ApiFeatures(Product.find({}, { name: 1, price: 1, images: 1 }), req.query)
        .search()
        .filter()
        .pagination(resultPerPage)
    const products = await apiFeatures.query

    res.status(200).json({
        success: true,
        products,
        productsCount,
        filteredProductsCount: products.length
    })
})

// Create new product -- Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    req.body.user = req.user.id

    const product = await Product.create(req.body)

    res.status(201).json({
        success: true,
        product
    })
})

// Update product -- Admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,                      // returns the newly updated object
        runValidators: true,
        useFindAndModify: false,
    })

    if (!product) {
        return next(new ErrorHandler("Product not found", 404))
    }

    res.status(200).json({
        success: true,
        product,
    })
})

// Delete product -- Admin
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404))
    }

    await product.remove();

    res.status(200).json({
        success: true,
        message: "Product Deleted Successfully",
    })
})

// Get product details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404))
    }

    res.status(200).json({
        success: true,
        product,
    })
})

// Create New Review or Update previous Review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment, description, productId } = req.body

    const review = {
        user: req.user.id,
        name: req.user.name,
        rating: Number(rating),
        comment,
        description,
    }

    const product = await Product.findById(productId)

    const isReviewed = product.reviews.find(rev => {
        if (rev.user.toString() === req.user.id.toString()) {
            rev.rating = Number(rating)
            rev.comment = comment
            rev.description = description
            return true
        }
    })

    if (!isReviewed) {
        product.reviews.push(review)
        product.numOfReviews = product.reviews.length
    }

    product.ratings = product.reviews.reduce((ratings, rev) => ratings + rev.rating, 0) / product.reviews.length

    await product.save({ validateBeforeSave: false })

    res.status(200).json({
        success: true,
        product
    })
})

// Get all Reviews of a product
exports.getAllReviews = catchAsyncErrors(async (req, res, next) => {

})

// Delete Review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id)

    if (!product) {
        return next(new ErrorHandler("Product not found", 404))
    }

    product.reviews = product.reviews.filter(rev => rev._id.toString() !== req.query.id.toString())
    product.ratings = product.reviews.reduce((ratings, rev) => ratings + rev.rating, 0) / product.reviews.length
    product.numOfReviews = product.reviews.length

    await product.save({ validateBeforeSave: false })

    res.status(200).json({
        success: true,
        message: "Review Deleted Successfully",
        product
    })
})
