const ErrorResponse = require('../utils/ErrorResponse')

const errorHandler = (err, req, res, next) => {
    let error = {...err}

    error.message = err.message

    // Duplicate value
    if(err.code === 11000){
        const message = 'Duplicate field value entered'
        error = new ErrorResponse(message, 400)
    }

    // Create an array of error messages
    if(err.name === "ValidationError"){
        const message  = Object.values(err.errors).map(val => val.message)
        error = new ErrorResponse(message, 400)
    }

    res.status(err.statusCode || 500).json({success: false, message: error.message || 'Server error'})   
}

module.exports = errorHandler