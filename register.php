<?php
require_once('db.php');

session_start(); // Розпочинаємо сесію (якщо ще не почато)

// Перевірка, чи $mysqli встановлено коректно
if (!$mysqli) {
    die("Помилка підключення до бази даних: " . mysqli_connect_error());
}

// Отримання даних з форми POST-запиту
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];

    // Перевірка, чи паролі співпадають
    if ($password !== $confirm_password) {
        echo "Паролі не співпадають";
    } else {
        // Перевірка, чи користувач уже існує в базі даних
        $query = "SELECT * FROM users WHERE email='$email'";
        $result = $mysqli->query($query);

        if ($result) {
            if ($result->num_rows > 0) {
                // Користувач вже існує, вивести помилку
                echo "Користувач з такою електронною поштою  вже існує";
            } else {
                // Хешування паролю перед збереженням
                $hashed_password = password_hash($password, PASSWORD_DEFAULT);

                // Додати нового користувача до таблиці користувачів
                $insert_query = "INSERT INTO users (username, email, password) VALUES ('$username', '$email', '$hashed_password')";
                if ($mysqli->query($insert_query) === TRUE) {
                    // Отримуємо ідентифікатор нового користувача
                    $new_user_id = $mysqli->insert_id;

                    // Додати ідентифікатор користувача в сесію
                    $_SESSION['user_id'] = $new_user_id;

                    echo "Користувач успішно зареєстрований";
                } else {
                    echo "Помилка реєстрації користувача: " . $mysqli->error;
                }
            }
        } else {
            echo "Помилка в запиті: " . $mysqli->error;
        }
    }

    // Закриття з'єднання з базою даних
    $mysqli->close();
}
?>
