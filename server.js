const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const errorHandler = require('./middleware/error')
const morgan = require('morgan')
const connectDB = require('./config/db')

dotenv.config({path: './config/config.env'});

// Connect to database
connectDB()

// Route files
const bootcamps = require('./routes/bootcamp')


const app = express();

// Body parser
app.use(express.json())

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'))
}

// Mount routers
app.use('/api/v1/bootcamps', bootcamps);

app.use(errorHandler)

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))

//Handle unhandled rejections
process.on('unhandledRejection', (err, promise) => {
	console.log(`Error: ${err.message}`.red)
// 	Close server & exit process
	server.close(() => process.exit(1))
});