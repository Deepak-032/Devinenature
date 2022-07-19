const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const Product = require('../models/product')
const ErrorHandler = require('../utils/errorHandler')
const ApiFeatures = require('../utils/apiFeatures')
const deleteFiles = require('../utils/deleteFiles')

// Get all products
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
    const resultPerPage = Number(req.query.resultPerPage) || 12
    const apiFeatures = new ApiFeatures(Product.find({}, {
        name: 1,
        // priceSpec: { $first: '$priceSpecs' },
        priceSpecs: 1,
        image: { $first: '$images' },
        ratings: 1,
        category: 1,
        description: 1,
        bestSelling: 1
    }), req.query)
        .search()
        .filter()
        .pagination(resultPerPage)
    const products = await apiFeatures.query.lean()

    const countDocs = new ApiFeatures(Product.find(), req.query).search().filter()
    const productsCount = await countDocs.query.countDocuments()

    res.status(200).json({
        success: true,
        products,
        productsCount,
        resultPerPage,
    })
})

// Create new product -- Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    req.body = { images: req.body.images, ...JSON.parse(req.body.product) }
    req.body.user = req.user.id

    try {
        const product = await Product.create(req.body)

        res.status(201).json({
            success: true,
            product
        })
    } catch (error) {
        if (req.body.images?.length)
            await deleteFiles(req.body.images)
        next(error)
    }
})

// Update product -- Admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    if(!req.body.images) {
        return next(new ErrorHandler("Please add atleast one image", 404))
    }

    req.body = { images: req.body.images, ...JSON.parse(req.body.product) }
    req.body.user = req.user.id

    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,                      // returns the newly updated object
        runValidators: true,
        useFindAndModify: false,
    })

    if (!product) {
        return next(new ErrorHandler("Product not found", 404))
    }

    if(req.body.deleteImages?.length) {
        await deleteFiles(req.body.deleteImages)
    }

    res.status(200).json({
        success: true,
        product,
    })
})

// Delete product -- Admin
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id)

    if (!product) {
        return next(new ErrorHandler("Product not found", 404))
    }

    await deleteFiles(product.images)
    await product.remove()

    res.status(200).json({
        success: true,
        message: "Product Deleted Successfully",
    })
})

// Get product details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id).lean()

    if (!product) {
        return next(new ErrorHandler("Product not found", 404))
    }

    product.reviews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).splice(6)

    res.status(200).json({
        success: true,
        product,
    })
})

// Create New Review or Update previous Review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment, description } = req.body

    const review = {
        user: req.user.id,
        name: req.user.name,
        rating: Number(rating),
        comment,
        description,
    }

    const product = await Product.findById(req.params.id)

    if (!product) {
        return next(new ErrorHandler("Product not found", 404))
    }

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
    await product.save()

    res.status(200).json({
        success: true,
        message: "Your review added successfully"
    })
})

// Get all Reviews of a product
exports.getAllReviews = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id, {
        name: 1,
        ratings: 1,
        numOfReviews: 1,
        images: 1,
        reviews: 1,
    }).lean()

    if (!product) {
        return next(new ErrorHandler("Product not found", 404))
    }

    product.reviews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    res.status(200).json({
        success: true,
        product
    })
})

// Get all Reviews -- Admin
exports.getReviews = catchAsyncErrors(async (req, res, next) => {
    const search = req.query.search ? {
        "review.name": {
            "$regex": req.query.search,
            "$options": "i"
        }
    } : {}

    const products = await Product.aggregate([
        { "$project": { name: 1, review: "$reviews" } },
        { "$unwind": { "path": "$review" } },
        { "$match": search },
        { "$sort": { "review.createdAt": -1 } }
    ])

    res.status(200).json({
        success: true,
        products
    })
})

// Delete Review -- Admin
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
