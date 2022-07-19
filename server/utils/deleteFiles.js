const fs = require('fs')
const path = require('path')

__dirname = path.resolve()

const deleteFiles = (images) => {
    images.forEach(async image => {
        await fs.unlink(path.join(__dirname, process.env.DELETE_PATH, image), error => {
            error && console.error(error)
        })
    })
}

module.exports = deleteFiles