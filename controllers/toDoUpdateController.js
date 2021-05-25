const ToDo = require('../models/ToDo');

const Joi = require('@hapi/joi');
const schemaToDo = Joi.object({
	id: Joi.string().min(6).max(1000).required(),
	title: Joi.string().min(6).max(40).required(),
	description: Joi.string().min(6).max(255),
});
console.log('init');
const toDoUpdateController = async (req, res) => {
	const { error } = schemaToDo.validate(req.body);
	if (error) return res.status(400).json({ error: error.details[0].message });

	const toDoExist = await ToDo.findOne({ _id: req.body.id });
	if (!toDoExist)
		return res.status(404).json({
			error: {
				errorCode: 404,
				errorMessage: 'The Selected Task, does not exist',
			},
		});
	const toDo = new ToDo({
		_id: req.body.id,
		title: req.body.title,
		description: req.body.description,
	});
	await toDo.updateOne(toDo);
	return toDo;
};

module.exports = toDoUpdateController;
