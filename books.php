<?php

include_once('src/db.config.inc.php');
include_once('src/Book.inc.php');

$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_DATABASE);
if ($conn->connect_errno) {
    echo 'Failed to connect to MySQL: (' . $conn->connect_errno . ') ' . $conn->connect_error;
}
$conn->set_charset('utf8');


if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $sql_id = "SELECT id FROM books ORDER BY name, author";
    $result = $conn->query($sql_id);
    $books = [];
    while ($row = $result->fetch_assoc()) {
        $book = new Book();
        $book->loadFromDB($conn, $row['id']);
        $books[] = $book;
    }
    echo json_encode($books); 
    
} else if ($_SERVER['REQUEST_METHOD']=='POST') {

    if (isset($_POST['author']) && isset($_POST['name']) && isset($_POST['book_desc']) &&
            $_POST['author'] != '' && $_POST['name'] != '' && $_POST['book_desc'] != '') {
        
        $author = $_POST['author'];
        $name = $_POST['name'];
        $book_desc = $_POST['book_desc'];     
        
        $newBook = new Book();
        
        if ($newBook->create($conn, $name, $author, $book_desc)) {
            echo json_encode(['status' => 'OK']);
	} else {
            echo json_encode(['status' => 'SAVE ERROR']);
        }
    } else {
        echo 'Wpisz coś!';
    }
} else if ($_SERVER['REQUEST_METHOD']=='DELETE') {
    
    parse_str(file_get_contents("php://input"), $del_vars);
    $book_id = $del_vars['book_id'];
    $book = new Book();
    
    if ( $book->loadFromDB($conn, $book_id) ) {
        //var_dump($book);
        if ( $book->deleteFromDB($conn) ) {
            echo json_encode(['status' => 'OK']);
        } else {
            echo json_encode(['status' => 'DELETE ERROR']);
        }
    } else {
        echo json_encode(['status' => 'LOAD ERROR']);
    }
} else if ($_SERVER['REQUEST_METHOD']=='PUT') {
    
    parse_str(file_get_contents("php://input"), $del_vars);
    $author = $del_vars['author'];
    $name = $del_vars['name'];
    $book_desc = $del_vars['book_desc'];
    $book_id = $del_vars['book_id'];
        
    $book = new Book();
    if ( $book->loadFromDB($conn, $book_id) ) {
        if ( $book->update($conn, $name, $author, $book_desc) ) {
            echo json_encode(['status' => 'OK']);
        } else {
            echo json_encode(['status' => 'UPDATE ERROR']);
        }
    } else {
        echo json_encode(['status' => 'LOAD ERROR']);
    }
}

?>