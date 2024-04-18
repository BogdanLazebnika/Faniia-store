<?php
require_once('config.php');

session_start();
$_SESSION['mysqli'] = $mysqli;

// Створення з'єднання з базою даних
$mysqli = new mysqli($servername, $username, $password, $dbname);

// Перевірка з'єднання
if ($mysqli->connect_error) {
    die("Помилка підключення до бази даних: " . $mysqli->connect_error);
}

?>