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

    // Створюємо об'єкт XMLHttpRequest
    let xhr = new XMLHttpRequest();

    // Встановлюємо метод та адресу серверного скрипту для відправки даних
    xhr.open('POST', 'login.php', true);

    // Встановлюємо обробник події для обробки відповіді від сервера
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) { // Перевіряємо стан запросу
            if (xhr.status === 200) { // Перевіряємо статус коду
                // Отримали відповідь від сервера
                document.getElementById('password_error').innerHTML = xhr.responseText;
                // Тут ви можете додати код для перенаправлення на іншу сторінку або інші дії після успішної авторизації
            } else {
                // Виникла помилка під час виконання запиту
                console.error('Помилка: ' + xhr.status);
            }
        }
    };

    // Формуємо дані форми для відправки
    let formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    // Відправляємо дані форми на сервер
    xhr.send(formData);
};