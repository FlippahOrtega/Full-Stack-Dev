const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
require('dotenv').config();

const app = express();

// capturar body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Conexión a Base de datos
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@clusterstack.hloek.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
mongoose
	.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('Database Connected'))
	.catch((e) => console.log('error db:', e));

// import routes
const authRoutes = require('./routes/auth');
const toDo = require('./routes/toDo');
const verifyToken = require('./middlewares/validate-token');
// route middlewares
app.use('/api/user', authRoutes);
app.use('/api/todo/', verifyToken, toDo);

app.get('/', (req, res) => {
	res.json({
		estado: true,
		mensaje: 'funciona!',
	});
});

// iniciar server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running at: ${PORT}`);
});
