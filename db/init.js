require('dotenv').config();
const mongoose = require('mongoose');

module.exports = async function init()
{
	await mongoose.connect(`${process.env.Db}`);
	console.log("connected to db")
}