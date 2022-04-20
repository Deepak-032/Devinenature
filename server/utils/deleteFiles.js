const path = require('path')
const fs = require('fs')
__dirname = path.resolve()

const deleteFiles = (images) => {
    const uploadedPath = path.join(__dirname, 'client/public/assets/uploads/')

    images.forEach(image => {
        fs.unlink(path.join(uploadedPath, image), error => {
            error && console.error(error)
        })
    })
}

module.exports = deleteFiles