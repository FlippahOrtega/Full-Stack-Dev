const ToDo = require('../models/ToDo');

const toDoListController = async (req, res) => {
	const toDoList = await ToDo.find();
	return toDoList;
};

module.exports = toDoListController;
