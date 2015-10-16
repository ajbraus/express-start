var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var TodoSchema = new Schema({
    body: String,
    completed: Boolean
});

var Todo = mongoose.model('Todo', TodoSchema)

module.exports = Todo;