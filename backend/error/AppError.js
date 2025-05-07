class AppError extends Error {
 constructor(type, code, message) {
  super(message)
  this.type = type
  this.code = code
  this.message = message
 }
}

module.exports = AppError