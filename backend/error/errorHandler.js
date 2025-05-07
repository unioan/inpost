const AppError = require('./AppError'); // adjust the path if needed

const errorHandler = async (error, req, res, next) => {
 if (error instanceof AppError) {
  return res.status(error.code).json({ 
   type: error.type,
   code: error.code,
   message: error.message
   })
 }

 return res.status(500).json({ message: `UNEXPECTED aka opanki: ${error}` })
}

module.exports = errorHandler

