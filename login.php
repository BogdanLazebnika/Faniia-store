<?php
require_once('db.php');

session_start(); // Розпочинаємо сесію (якщо ще не почато)

// Перевірка, чи $mysqli встановлено коректно
if (!$mysqli) {
    die("Помилка підключення до бази даних: " . mysqli_connect_error());
}

// Отримання даних з форми POST-запиту
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Підготовка SQL-запиту
    $query = "SELECT id, password FROM users WHERE email=?";

    // Підготовка і виконання підготовленого запиту
    $stmt = $mysqli->prepare($query);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result) {
        if ($result->num_rows > 0) {
            // Отримання даних користувача з бази даних
            $row = $result->fetch_assoc();
            $stored_password = $row['password']; // Отримуємо хеш паролю з бази даних

            // Перевірка введеного паролю за допомогою password_verify
            if (password_verify($password, $stored_password)) {
                // Авторизація успішна
                $_SESSION['user_id'] = $row['id'];

                // Перенаправлення на сторінку account.php
                header("Location: account.php");
                exit(); // Важливо викликати exit після header, щоб забезпечити коректне перенаправлення
            } else {
                // Помилка авторизації: невірний пароль
                echo "Невірний пароль";
            }
        } else {
            // Помилка авторизації: користувач з введеним email не знайдений
            echo "Користувача з таким email не знайдено";
        }
    } else {
        echo "Помилка в запиті: " . $mysqli->error;
    }

    $stmt->close(); // Закриваємо підготовлений запит
}

$mysqli->close(); // Закриття з'єднання з базою даних
?>