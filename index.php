<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <link rel='stylesheet' href='css/style.css'>
        <script src="js/jquery-3.1.1.min.js"></script>
        <script src="js/app.js"></script>
    </head>
    <body>
        
        <form id="addBook" method='POST' action=''>
            <label>Imię i nazwisko autora:</label>
            <input type='text' name='author'>            
            <label>Tytuł książki:</label>
            <input type='text' name='name'>
            <label>Opis książki:</label>
            <input type='text' name='book_desc'>            
            <input type="submit" value="Dodaj książkę" />
        </form> 
        
        <hr>
        
        <h1>Ksiązki</h1>
        <a id="refresh" href="#">Odśwież</a><br>
        <table id='books' border="1" cellspacing="4" cellpadding="4" width="100%">
            <tr>
                <th colspan="4">Tytuł</th>
            </tr>
        </table>
    </body>
</html>

