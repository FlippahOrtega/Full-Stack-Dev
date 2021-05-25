const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// password
const bcrypt = require('bcrypt');

// validation
const Joi = require('@hapi/joi');

const schemaRegister = Joi.object({
	name: Joi.string().min(6).max(255).required(),
	email: Joi.string().min(6).max(255).required().email(),
	password: Joi.string().min(6).max(1024).required(),
});

const schemaLogin = Joi.object({
	email: Joi.string().min(6).max(255).required().email(),
	password: Joi.string().min(6).max(1024).required(),
});
router.post('/login', async (req, res) => {
	// validaciones
	const { error } = schemaLogin.validate(req.body);
	if (error) return res.status(400).json({ error: error.details[0].message });

	const user = await User.findOne({ email: req.body.email });
	if (!user) return res.status(404).json({ error: 'User not found' });

	const validPassword = await bcrypt.compare(req.body.password, user.password);
	if (!validPassword) return res.status(400).json({ error: 'Password Incorret' });

	res.json({
		error: null,
		data: 'Welcome',
	});
});
router.post('/register', async (req, res) => {
	// validate user
	const { error } = schemaRegister.validate(req.body);

	if (error) {
		return res.status(400).json({ error: error.details[0].message });
	}

	const isEmailExist = await User.findOne({ email: req.body.email });

	if (isEmailExist) {
		return res.status(400).json({ error: 'Email already registered' });
	}

	// hash contraseña
	const salt = await bcrypt.genSalt(10);
	const password = await bcrypt.hash(req.body.password, salt);

	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password,
	});
	try {
		const savedUser = await user.save();
		res.json({
			error: null,
			data: savedUser,
		});
	} catch (error) {
		res.status(400).json({ error });
	}
});

module.exports = router;
