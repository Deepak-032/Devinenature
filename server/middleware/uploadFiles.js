const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const path = require('path')

__dirname = path.resolve()
const imageMimeTypes = ['image/jpeg', 'image/jpg', 'image/png']

exports.uploadFiles = catchAsyncErrors(async (req, res, next) => {
    if (req.files == null) {
        let oldImages = req.body.oldImages
        if (oldImages) {
            if (!Array.isArray(oldImages)) {
                oldImages = [oldImages]
            }
            req.body.images = oldImages
        }
        return next()
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
        uploadedImages.push(`/assets/uploads/${image.name}`)
        return image
    })

    if (mimeTypeMissing) {
        return next(new ErrorHandler("Acceptable formats jpeg, jpg or png only", 400))
    }

    const promises = images.map(image => {
        const savePath = path.join(__dirname, process.env.UPLOAD_PATH) + image.name
        return image.mv(savePath)
    })

    await Promise.all(promises)

    if (req.body.oldImages) {
        let oldImages = req.body.oldImages
        if (!Array.isArray(oldImages)) {
            oldImages = [oldImages]
        }
        req.body.images = [...oldImages, ...uploadedImages]
    } else {
        req.body.images = uploadedImages
    }

    next()
})
