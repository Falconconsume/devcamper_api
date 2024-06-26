const fs = require('fs');
const mongoose = require('mongoose')
const colors = require('colors')
const dotenv = require('dotenv')

dotenv.config({path: './config/config.env'})

const Bootcamp = require('./models/Bootcamp')

//Connect to DB

mongoose.connect(process.env.MONGO_URI)

const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, {encoding: 'utf-8'}))

//Import into DB

const importData = async () => {
	try {
		await Bootcamp.create(bootcamps);
		console.log('Data Imported...'.green.inverse);
		process.exit()
	} catch (err) {
		console.error(err)
	}
}

//Delete data

const deleteData = async () => {
	try {
		await Bootcamp.deleteMany();
		console.log('Data Destroyed...'.red.inverse);
		process.exit()
	} catch (err) {
		console.error(err)
	}
}

if (process.argv[2] === '-i') {
	importData()
} else if (process.argv[2] === '-d') {
	deleteData()
}