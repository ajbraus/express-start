console.log("I live to serve");

$(document).ready(function() {  

  $('#new-todo').submit(function (e) {
  	e.preventDefault();

  	var todo = $(this).serialize();

  	$.post('/todos', todo, function (data) {
  		console.log(data)
  		$('#todo-list').append(
  							"<li class='list-group-item'>" + 
  								"<a href='/todos/" + data._id + "'>" + data.body + "</a>" +
	  							"<div class='remove-todo pull-right' data-id='" + data._id + "'><i class='icon ion-ios-trash-outline'></i></div>" +
  							"</li>");
  		$('#new-todo')[0].reset();
  	})
  });

  $('#todo-list').on("click", ".remove-todo", function (e) {
  	e.preventDefault();

  	var todo = $(this)
  	var todoId = todo.data('id');

  	console.log(todoId);

  	$.ajax({
	    url: '/todos/' + todoId,
	    type: 'DELETE',
	    success: function(data) {
	    	console.log("blah")
	      todo.parent().remove();
	    }
  	});

  })

});
