// DECLARATIONS
var express = require('express');
var handlebars  = require('express-handlebars');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');

var app = express();


//MIDDLEWARE 
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static('public'));

app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: 'SuperSecretCookie',
  cookie: { maxAge: 600000 }
}));

mongoose.connect('mongodb://localhost/express-start');
var Todo = require('./models/todo.js');
var User = require('./models/user.js');

app.get('/signup', function (req, res) {
	res.render('signup');
})

app.post('/users', function (req, res) {
	var user = req.body;
	User.createSecure(user.email, user.password, function (err, user) {
		req.session.user = user;
		res.json({ user: user, msg: "User Created Successfully!" });
	})
})

app.post('/login', function (req, res) {
	var user = req.body;
	User.authenticate(user.email, user.password, function (err, user) {
		if (err) { console.log("there was an err: ", err) }
		req.session.user = user;
		res.json(user);
	})
})

app.get('/current-user', function (req, res) {
	res.json({ user: req.session.user })
})

app.get('/logout', function (req, res) {
	req.session.user = null;

	res.json({ msg: "User Logged Out Successfully!"})
})

app.get('/login', function (req, res) {
	res.render('login');
})

// TODOS INDEX
app.get('/', function (req, res) {
	console.log(req.session.userId);
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




