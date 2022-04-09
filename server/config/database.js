const mongoose = require('mongoose')

const connectDatabase = () => {
    mongoose.connect(process.env.DATABASE_URL)
        .then(() => console.log("Mongodb connected with server!"))
}

module.exports = connectDatabase
// It should not have catch block because then it will be handled and not Unhandled Promise rejection which we have setup in server.js.