let registerOrLogin = `
    <div>
        <p>У вас є акаунт чи ви хочете зареєструватися</p>
        <button id="register-en-account"><a href="registerForm.php">Зареєструватися</a></button>
        <button id="llog into the account"><a href="loginForm.php">Увійти</a></button>
    </div>   

`
document.getElementById('login-or-create').innerHTML = registerOrLogin;
