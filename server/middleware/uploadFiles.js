const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const path = require('path')

__dirname = path.resolve()
const imageMimeTypes = ['image/jpeg', 'image/jpg', 'image/png']
const uploadPath = path.join(__dirname, 'client/public/assets/uploads/')

exports.uploadFiles = catchAsyncErrors(async (req, res, next) => {
    if (req.files == null) {
        return next(new ErrorHandler("Please choose images to upload", 400))
    }

    let images = req.files.images,
        uploadedImages = [],
        mimeTypeMissing = false

    if (!Array.isArray(images)) {
        images = [images]
    }

    // Changing the names of the images
    images = images.map(image => {
        if (!imageMimeTypes.includes(image.mimetype)) {
            mimeTypeMissing = true
        }
        image.name = Date.now() + "." + image.name
        uploadedImages.push(image.name)
        return image
    })

    if (mimeTypeMissing) {
        return next(new ErrorHandler("Acceptable formats jpeg, jpg or png only", 400))
    }

    const promises = images.map(image => {
        const savePath = uploadPath + image.name
        return image.mv(savePath)
    })

    await Promise.all(promises)
    req.body.images = uploadedImages
    next()
})
