const router = require('express').Router();
const ToDo = require('../models/ToDo');
// validation
const Joi = require('@hapi/joi');
const toDoCreateController = require('./../controllers/toDoCreateController');
const toDoListController = require('./../controllers/toDoListController');
const toDoDeleteController = require('../controllers/toDoDeleteController');

router.post('/create', async (req, res) => {
	try {
		const toDo = await toDoCreateController(req, res);
		const saveToDo = await toDo.save();
		res.json({
			error: null,
			data: saveToDo,
		});
	} catch (error) {
		res.status(400).json({ error });
	}
});
router.get('/list', async (req, res) => {
	try {
		const toDo = await toDoListController(req, res);
		res.json({
			error: null,
			data: toDo,
		});
	} catch (error) {
		res.status(400).json({ error });
	}
});
router.delete('/delete', async (req, res) => {
	try {
		const toDo = await toDoDeleteController(req, res);
		console.log('todos', toDo);
		//	const deleteToDo = await toDo.remove();

		res.json({
			error: null,
			data: toDo,
		});
	} catch (error) {
		res.status(400).json({ error });
	}
});
/* router.put('/update', async (req, res) => {
	try {
		const toDo = await toDoListController(req, res);
		console.log('todos', toDo);
		res.json({
			error: null,
			data: toDo,
		});
	} catch (error) {
		res.status(400).json({ error });
	}
}); */

module.exports = router;
