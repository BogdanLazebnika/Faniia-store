<?php
session_start();
// Видалення всіх змінних сесії
$_SESSION = array();

// Знищення сесії
session_destroy();

// Перенаправлення на сторінку входу
header("Location: loginForm.php");
exit;
?>