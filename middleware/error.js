const ErrorResponse = require("../utills/errorResponse");
const errorHandler = (err, req, res, next) => {
	let error = {...err}

	error.message = err.message;

	console.log(err)

	// Mongooes bad ObjectId
	if (err.name === 'CastError') {
		const message = `Bootcamp not found with id of ${err.value}`;
		error = new ErrorResponse(message, 404)
	}

	// Mongoose duplicate key
	if (err.code === 11000) {
		const message = 'Dublicate field entered'
		error = new ErrorResponse(message, 400)
	}

	// Mongoose validation error
	if(err.name === 'ValidationError') {
		const message = Object.values(err.errors).map(value => value.message);
		error = new ErrorResponse(message, 400)
	}

	res.status(error.statusCode || 500).json({
		success: false,
		error: error.message || "Server Error"
	})
}

module.exports = errorHandler;