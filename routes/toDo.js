const router = require('express').Router();
const ToDo = require('../models/ToDo');
// validation
const Joi = require('@hapi/joi');
const schemaToDo = Joi.object({
	title: Joi.string().min(6).max(40).required(),
	description: Joi.string().min(6).max(255),
});
router.post('/create', async (req, res) => {
	const { error } = schemaToDo.validate(req.body);
	if (error) return res.status(400).json({ error: error.details[0].message });

	const toDoTitleExist = await ToDo.findOne({ title: req.body.title });
	if (toDoTitleExist)
		return res.status(404).json({
			error: {
				errorCode: 423,
				errorMessage: 'Duplicate title task',
			},
		});
	const toDo = new ToDo({
		title: req.body.title,
		description: req.body.description,
	});
	try {
		const saveToDo = await toDo.save();
		res.json({
			error: null,
			data: saveToDo,
		});
	} catch (error) {
		res.status(400).json({ error });
	} /* 
	res.json({
		error: null,
		data: {
			title: 'mi ruta protegida',
			user: req.user,
		},
	}); */
});

module.exports = router;
