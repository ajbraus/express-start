// DECLARATIONS
var express = require('express');
var handlebars  = require('express-handlebars');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();


//MIDDLEWARE 
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static('public'));

mongoose.connect('mongodb://localhost/express-start');
var Todo = require('./models/todo.js');

// TODOS INDEX
app.get('/', function (req, res) {
	Todo.find().exec(function (err, todos) {
		res.render('home', { todos: todos });
	})
});

// TODOS SHOW
app.get('/todos/:id', function (req, res) {
	Todo.findById(req.params.id).exec(function (err, todo) {
		res.render('todo-show', {todo: todo})
	})
})

// TODOS CREATE
app.post('/todos', function (req, res){
	var todo = req.body;

	Todo.create(todo, function (err, todo) {
		res.status(200).json(todo);
	})
})

// TODOS DELETE
app.delete('/todos/:id', function (req, res) {
	Todo.findById(req.params.id).exec(function (err, todo) {
		todo.remove();
		res.status(200).json({});
	})
})
// TODOS UPDATE

// TODOS EDIT
// TODOS NEW

// LISTENTING TO A PORT
var server = app.listen(3000, function () {
  console.log('I\'m Alive!');
});




