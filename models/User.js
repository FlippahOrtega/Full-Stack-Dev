const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		min: 6,
		max: 255,
	},
	email: {
		type: String,
		required: true,
		min: 6,
		max: 256,
	},
	password: {
		type: String,
		required: true,
		minlength: 6,
		maxlength: 255,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('User', userSchema);
