const app = require('./app')
const connectDatabase = require('./config/database')

// Handling Uncaught Exception
process.on('uncaughtException', err => {
    console.log(`Error: ${err.message}`)
    console.log('Shutting down the server due to Uncaught Exception')
    process.exit(1)
})

// config
require('dotenv').config({ path: 'server/config/.env' })
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })

// connecting to database
connectDatabase()

const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on ${process.env.PORT} in ${process.env.NODE_ENV} mode`)
})

// Unhandled Promise rejection
process.on('unhandledRejection', err => {
    console.log(`Error: ${err}`)
    console.log('Shutting down the server due to Unhandled Promise rejection')
    server.close(() => {
        process.exit(1)
    })
})
