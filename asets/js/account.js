let createAccount =`
<div class="login-or-registeer-button">

<button>ЗАЙТИ В АККАУНТ</button>
<button>ЗАРЕЄСТРУВАТИ АККАУНТ</button>

</div><br>

<form class="container-create-account" action="register.php" method="post">
<h1>СТВОРЕННЯ АККАУНТУ</h1>

<input type="text" placeholder="login" name="login">
<input type="text" placeholder="password" name="pass">
<input type="text" placeholder="repeat password" name="repeatpass">
<input type="text" placeholder="email" name="email">
<button type="submit">Зареєструватися</button>
</form><br>

<div class="login-account">
<div>
    <h1>УВІЙДІТЬ В ОСОБИСТИЙ КАБІНЕТ ЗА ДОПОМОГОЮ СОЦІАЛЬНИХ МЕРЕЖ</h1>
    <button>GMAIL</button><button>APLE</button>
<div><br>
</div>
    <h1>УВІЙДІТЬ В ОСОБИСТИЙ КАБІНЕТ</h1>
    <input vrap="Email або Телефон *+38068329696"></input>
    <input></input>
    <p>Ще нема акаунта?</p>
   <button>ЗАРЕЄСТРУВАТИ АККАУНТ</button>
</div>
</div><br>

<div class="option-account-container">
<h1>ОСОБИСТИЙ КАБІНЕТ</h1>
</div>
`
document.getElementById('create-acount').innerHTML = createAccount