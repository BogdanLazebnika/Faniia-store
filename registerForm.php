<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
    <title>Faniia</title>
    
    <!-- logotipe css -->
    <link rel="stylesheet" href="asets/css/reset.css">
    <link rel="stylesheet" href="asets/css/style.css">

    <!-- icone -->
    <link rel="icon" type="icone" href="asets/imgs/icone.png">
    
    
    
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
        
        <div class="container-authorization">
            <h2>Реєстрація</h2>
            <form action="register.php" method="POST">
                <label for="username">Ім'я:</label>
                <input type="text" id="username" name="username" placeholder="Введіть ім'я" required>

                <label for="email">Електронна пошта:</label>
                <input type="email" id="email" name="email" placeholder="Ведіть emeil" required >

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
                <h1>Вже маєте акаунт?</h1>
                <a href="loginForm.php"><button>Увійти</button></a>
            </div>
        </div>


        <link rel="stylesheet" href="asets/css/authorization.css">

        <script src="asets/js/registerForm.js" defer></script>
    </main>

    
    <footer class="footer">
        <!-- Footer menu -->
        <div id="footer-id-site"></div>
        <script src="asets/js/footer.js"></script>
        
    </footer>
</body>
</html>