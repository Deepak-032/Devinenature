const uploadFile = async (images) => {
    const path = __dirname + "/client/public/uploads/"

    // Changing the names of the images
    images = images.map(image => {
        image.name = Date.now() + "." + image.name
        return image
    })

    const promises = images.map(image => {
        const savePath = path + image.name
        return image.mv(savePath)
    })

    return await Promise.all(promises)
}

module.exports = uploadFile
