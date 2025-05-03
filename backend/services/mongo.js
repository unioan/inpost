require('dotenv').config()
const mongoose = require('mongoose')
const MONGO_URL = process.env.MONGO_URL

mongoose.connection.on('open', () => {
 console.log('Connected to Mongo Atlas')
})

mongoose.connection.on('error', (error) => {
 console.error(error)
})

async function connectDB() {
 mongoose.connect(MONGO_URL)
}

async function disconnectDB() {
 mongoose.disconnect(MONGO_URL)
}

module.exports = {
 connectDB,
 disconnectDB
}