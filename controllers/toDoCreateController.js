const ToDo = require('../models/ToDo');

const Joi = require('@hapi/joi');
const schemaToDo = Joi.object({
	title: Joi.string().min(6).max(40).required(),
	description: Joi.string().min(6).max(255),
});
const toDoCreateController = async (req, res) => {
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
	return toDo;
};

module.exports = toDoCreateController;
