<?php
session_start(); // Розпочинаємо сесію (якщо ще не почато)

// Перевіряємо, чи існує ідентифікатор користувача в сесії
if (isset($_SESSION['user_id'])) {
    // Користувач авторизований, перенаправляємо на сторінку accountForm.php
    header("Location: accountForm.php");
    exit;
} else {
    // Користувач не авторизований, перенаправляємо на сторінку loginForm.php
    header("Location: loginForm.php");
    exit;
}
?>