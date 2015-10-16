console.log("I live to serve");

$(document).ready(function() {  

  $('#new-todo').submit(function (e) {
  	e.preventDefault();

  	var todo = $(this).serialize();

  	$.post('/todos', todo, function (data) {
  		console.log(data)
  		$('#todo-list').append("<li>" + data.body + "</li>");
  		$('#new-todo')[0].reset();
  	})
  });

  $('.remove-todo').click(function (e) {
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
