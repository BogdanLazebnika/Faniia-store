let showPasswordButtons = document.querySelectorAll('.show-password-button');

showPasswordButtons.forEach(button => {
    button.addEventListener('mousedown', () => {
        let passwordField = button.previousElementSibling;
        passwordField.type = "text";
    });

    button.addEventListener('mouseup', () => {
        let passwordField = button.previousElementSibling;
        passwordField.type = "password";
    });

    button.addEventListener('mouseout', () => {
        let passwordField = button.previousElementSibling;
        passwordField.type = "password";
    });

    let passwordField = button.previousElementSibling;
    passwordField.addEventListener('input', () => {
        button.style.visibility = passwordField.value !== '' ? 'visible' : 'hidden';
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
    fetch('register.php', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Помилка: ' + response.status);
        }
        return response.text();
    })
    .then(data => {
        // Отримали відповідь від сервера
        document.getElementById('password_error').innerHTML = data;
    })
    .catch(error => {
        // Виникла помилка під час виконання запиту
        console.error('Помилка: ' + error);
    });
};