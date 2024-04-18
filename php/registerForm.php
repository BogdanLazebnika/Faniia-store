<!DOCTYPE html>
<html lang="ua">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Форма реєстрації</title>
<style>
    body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
    }
    .container {
        min-width: 200px;
        max-width: 400px;
        margin: 50px auto;
        background: #fff;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    h2 {
        text-align: center;
    }
    label {
        display: block;
        margin-bottom: 10px;
    }
    input[type="text"],
    input[type="email"],
    input[type="password"],
    input[type="tel"] {
        width: 100%;
        padding: 10px;
        margin-bottom: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-sizing: border-box;
    }
    input[type="submit"] {
        background-color: #4CAF50;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        width: 100%;
    }
    input[type="submit"]:hover {
        background-color: #45a049;
    }
    .error {
        color: red;
        margin-top: 5px;
    }
    .login-link {
        text-align: center;
        margin-top: 10px;
    }
    .login-link a {
        color: blue;
        text-decoration: underline;
        cursor: pointer;
    }
    .password-container input[type="password"] {
        width: 100%;
        padding: 10px;
        margin-bottom: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-sizing: border-box;
    }

    .password-container {
        position: relative;
    }
    .buttonShow{
       
    }

    .show-password-button {
        border: none;
        background-color: transparent;
        position: absolute;
        right: 0;
        top: 30%;
        transform: translateY(-50%);
        display: flex;
        align-items: center;
        padding: 0 10px;
        color: black;
        cursor: pointer;
    }
</style>
</head>
<body>
    <header class="header fixed">
        
        <script src="asets/js/header.js" defer></script>
        
        <!-- Header top menu -->
        <div id="header__top-menu-id"></div>
        
        <!-- Header center menu -->
        <div id="header__center-menu-id"></div>
        
    </header>
    
    
    <leftMenu>

        <!-- Left mobile menu -->
        <div id="left-mobile_menu-id"></div>
        <script src="asets/js/leftMenu.js" defer></script>
        
    </leftMenu>

    <main class="content">
        <div class="container">
            <h2>Реєстрація</h2>
            <form action="register.php" method="POST">
                <label for="username">Ім'я користувача:</label>
                <input type="text" id="username" name="username" placeholder="Введіть ім'я" required>

                <label for="email">Електронна пошта:</label>
                <input type="email" id="email" name="email" placeholder="Ведіть emeil" required >

                <label for="phone">Номер телефону (необов'язково):</label>
                <input type="tel" id="phone" name="phone" placeholder="Введіть номер телефону">

                <label for="password">Пароль:</label>
                <div class="password-container">
                    <input type="password" id="password" name="password"  placeholder="Введіть пароль" required>
                    <button type="button" class="show-password-button">👁️</button>
                </div>
                

                <label for="confirm_password">Підтвердження пароля:</label>
                <div class="password-container">
                    <input type="password" id="confirm_password" name="confirm_password" placeholder="Підтвердіть пароль" required>
                    <button type="button" class="show-password-button">👁️</button>
                </div>
            

                <input type="submit" value="Зареєструватися">
                <div id="password_error" class="error"></div>
            </form>
            <div class="login-link">
                Вже маєте акаунт? <a href="loginForm.php">Увійти</a>.
            </div>

            <button onclick="window.location.href = 'index.php';">Повернутися назад</button>
        </div>


        <link rel="stylesheet" href="asets/css/registerForm.css">

        <script src="asets/js/registerForm.js" defer></script>
    </main>

    <script>
        let showPasswordButtons = document.querySelectorAll('.show-password-button');

        showPasswordButtons.forEach(function(button) {
            button.addEventListener('mousedown', function() {
                let passwordField = this.previousElementSibling;
                passwordField.type = "text";
            });

            button.addEventListener('mouseup', function() {
                let passwordField = this.previousElementSibling;
                passwordField.type = "password";
            });

            button.addEventListener('mouseout', function() {
                let passwordField = this.previousElementSibling;
                passwordField.type = "password";
            });

            let passwordField = button.previousElementSibling;
            passwordField.addEventListener('input', function() {
                if (passwordField.value !== '') {
                    button.style.visibility = 'visible';
                } else {
                    button.style.visibility = 'hidden';
                }
            });
        });

        document.querySelector('form').onsubmit = function(event) {
            event.preventDefault(); // Зупиняємо стандартну дію форми (перенаправлення)

            let email = document.getElementById('email').value;
            let password = document.getElementById('password').value;
            let confirm_password = document.getElementById('confirm_password').value;
            let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            let passwordRegex = /^.{8,}$/;

            if (!email.match(emailRegex)) {
                document.getElementById('password_error').innerHTML = "Введіть правильну електронну пошту";
                return false; // Перериваємо відправку форми
            }

            if (!password.match(passwordRegex)) {
                document.getElementById('password_error').innerHTML = "Пароль повинен містити принаймні 8 символів";
                return false; // Перериваємо відправку форми
            }

            if (password !== confirm_password) {
                document.getElementById('password_error').innerHTML = "Паролі не співпадають";
                return false; // Перериваємо відправку форми
            }

            let formData = new FormData(this); // Отримуємо дані форми
            let xhr = new XMLHttpRequest(); // Створюємо об'єкт XMLHttpRequest

            xhr.open('POST', 'register.php', true); // Вказуємо метод POST та адресу серверного скрипту
            xhr.onreadystatechange = function() {
                if (xhr.readyState === XMLHttpRequest.DONE) { // Перевіряємо стан запросу
                    if (xhr.status === 200) { // Перевіряємо статус коду
                        // Отримали відповідь від сервера
                        document.getElementById('password_error').innerHTML = xhr.responseText;
                    } else {
                        // Виникла помилка під час виконання запиту
                        console.error('Помилка: ' + xhr.status);
                    }
                }
            };

            xhr.send(formData); // Відправляємо дані форми на сервер
        };
    </script>

    <footer class="footer">
        <!-- Footer menu -->
        <div id="footer-id-site"></div>
        <script src="asets/js/footer.js"></script>
        
    </footer>
</body>
</html>