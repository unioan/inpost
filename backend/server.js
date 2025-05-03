const http = require('http')
const app = require('./app')
const { connectDB } = require('./services/mongo')
const port = process.env.PORT || 3000

async function startServer() {
 await connectDB()
 const server = http.createServer(app)

 server.listen(port, () => {
  console.log('Server is listening on', server.address())
 })
}

startServer()
