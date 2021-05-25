const ToDo = require('../models/ToDo');

const Joi = require('@hapi/joi');
const schemaToDo = Joi.object({
	id: Joi.string().min(6).max(1000).required(),
});
const toDoDeleteController = async (req, res) => {
	const { error } = schemaToDo.validate(req.body);
	if (error) return res.status(400).json({ error: error.details[0].message });

	const toDoTitleExist = await ToDo.findOneAndRemove({ _id: req.body.id });
	if (!toDoTitleExist)
		return res.status(404).json({
			error: {
				errorMessage: 'The Selected Task, does not exist',
			},
		});
		const response ={
			message:"Delete has been success"
		}
	return response;
};

module.exports = toDoDeleteController;
