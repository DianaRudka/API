$(document).ready(function() {
    console.log('DOM załadowany');

    function loadBooks() {
        $.get('books.php', function(json) {
            $('table#books').find('tr.bookTitle').remove();
            $('table#books').find('tr.bookInfo').remove();

            var booksLoaded = $.parseJSON(json);
            //console.log(booksLoaded);

            for (var i = 0; i < booksLoaded.length; i++) {
                var bookLoaded = $('<tr class="bookTitle" data-book-id=' + booksLoaded[i].id
                + '><td class="title" colspan="4">' + booksLoaded[i].name + '</td>' +
                '<tr class="bookInfo" data-book-id=' + booksLoaded[i].id + ' style="display: none"><td>' +
                booksLoaded[i].author + '</td><td>' + booksLoaded[i].book_desc +
                '</td><td><a class="edit" href="#">Edytuj</a></td><td><a class="remove" href="#">Usuń</a></td></tr>');

                $('table#books').append(bookLoaded);
            }
        });
    }

    function addBook(author, name, book_desc) {
        $.post('books.php', {author: author, name: name, book_desc: book_desc})

        .done(function(json) {
			$('form#addbook').find('input[type="text"]').prop('value', '');
			loadBooks();
		})
		.fail(function(xhr) {
			console.log('add error', xhr);
		})
		.always(function(xhr) {
		})
    }

    function editBook(bookId) {
        var bookAuthor = $('table#books').find('tr.bookInfo[data-book-id="' + bookId + '"] td').eq(0).text();
		var bookDesc = $('table#books').find('tr.bookInfo[data-book-id="' + bookId + '"] td').eq(1).text();
        var bookName = $('table#books').find('tr.bookTitle[data-book-id="' + bookId + '"] td').text();

		var editForm = $('<tr class="editForm" data-book-id="' + bookId + '"><td><input name="author" value="' + bookAuthor +
        '" /></td><td><input name="name" value="' + bookName + '"/></td><td><textarea name="book_desc" >' + bookDesc +
        '</textarea></td><td><a class="save" href="#">Zapisz</a><br><a class="cancelSave" href="#">Anuluj</a></td></tr>');

		$('table#books').find('tr.bookInfo[data-book-id="' + bookId + '"]').after(editForm);

		$('table#books').find('tr.editForm[data-book-id="' + bookId + '"]').find('input[name="author"]').focus();
	}

    function removeBook(bookId) {
		$.ajax({
			url: 'books.php',
			data: {book_id: bookId},
			type: 'DELETE',
			dataType: 'json'
		})
		.done(function(json) {
			loadBooks();
		})
		.fail(function(xhr) {
			console.log('add error', xhr);
		})
		.always(function(xhr) {
		})
	}

    function updateBook(bookAuthor, bookName, bookDesc, bookId) {
        $.ajax({
			url: 'books.php',
			data: {author: bookAuthor, name: bookName, book_desc: bookDesc, book_id: bookId},
			type: 'PUT',
			dataType: 'json'
		})
		.done(function(json) {
            $('table#books').find('tr.editForm').remove();
			loadBooks();
		})
		.fail(function(xhr) {
			console.log('update error', xhr);
		})
		.always(function(xhr) {
		})
	}

    loadBooks();

    $('a#refresh').click(function() {
      loadBooks();
    });

    $(document).on('click', 'td.title', function() {
      var bookId = $(this).parent().data('book-id');
    //   console.log(bookId);
      $(this).parent().next().toggle();
    })

    $('form#addBook').find('input[type="submit"]').click(function() {
        event.preventDefault();
  		var author = $(this).parent().find('input[name="author"]').prop('value');
  		var name = $(this).parent().find('input[name="name"]').prop('value');
  		var book_desc = $(this).parent().find('input[name="book_desc"]').prop('value');
  		//console.log(author + name + book_desc);
  		addBook(author, name, book_desc);
  	})

    $('table#books').on('click', 'a.edit', function() {
        $('table#books').find('tr.editForm').remove();
		var bookId = $(this).parents('tr.bookInfo').first().data('book-id');
		editBook(bookId);
	})

	$('table#books').on('click', 'a.remove', function() {
        var bookAuthor = $(this).parent().siblings().first().text();
		var bookName = $(this).parent().parent().prev().children().first().text();
        var bookId = $(this).parents('tr.bookInfo').data('book-id');

		if ( confirm('Czy na pewno chcesz usunąć książkę ' + bookName + ', ' + bookAuthor + '?') ) {
			removeBook(bookId);
		}
	})

    $('table#books').on('click', 'a.save', function() {
		var bookAuthor = $(this).parents('tr.editForm').find('input[name="author"]').prop('value');
		var bookName = $(this).parents('tr.editForm').find('input[name="name"]').prop('value');
		var bookDesc = $(this).parents('tr.editForm').find('textarea[name="book_desc"]').prop('value');
		var bookId = $(this).parents('tr.editForm').data('book-id');

		updateBook(bookAuthor, bookName, bookDesc, bookId);
	})

    $('table#books').on('click', 'a.cancelSave', function() {
		$(this).parents('tr.editForm').remove();
	})
});
