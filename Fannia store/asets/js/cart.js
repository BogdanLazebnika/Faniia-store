// Вивід інформаціїї про кошик загальної суми скидок і т.д
let notProductsProductsCart = `
    <div class="cart-products-not-products">
        <div class="non-products-text"><p>КОШИК ПОРОДЖНІЙ</p></div>
        <div class="non-products-button"><button onclick="window.location.href = 'index.html'">
            <p>ПЕРЕЙТИ В КАТАЛОГ</p>
        </button></div>

    </div>
    `;
document.getElementById('not-products-productsCart').innerHTML = notProductsProductsCart;





function createCartProductCard(product, size, quantity) {
    const isProductInSavedCart = isProductSaved(product.id);
    const buttonLabel = isProductInSavedCart ? "asets/imgs/icons8-heart-off-like.png" : "asets/imgs/icons8-heart-on-like.png";

    // Вычисляем скидку в процентах
    const discountPercentage = ((product.price - product.discount) / product.price) * 100;
    
    // Проверяем, есть ли скидка на продукт
    const hasDiscount = product.discount && product.discount < product.price;
    
    return `
    <div class="cart-product" id="${product.id}-${size}">
    
        <div class="cart-in-products">

            <div class="fixed_container-cart">
                <div class="prducts__card__img">
                    <img class="prducts__card__img" src="${product.img}" alt="${product.name}" onclick="redirectToProduct('${product.id}')">
                </div>
                <div class="products__card-info">
                    <div class="name__products-info">
                        <h3>${product.name}</h3>
                    </div>
                    <div class="article-products-info">
                        <h1>Артикул: ${product.id}</h1>
                    </div>
                    <div class="size-products-info">
                        <p>Розмір:</p><p class="size_products-width">${size}</p>
                    </div>
                </div>
            </div>

            <div class="botom_container-cart">
                <div class="quantity-controls">
                    <button class="button-minus-quantity" onclick="increaseQuantity('${product.id}', '${size}')">+</button>
                    <input class="input-quantity" " id="quantity-${product.id}-${size}" value="${quantity}" min="1" onchange="updateCartQuantity('${product.id}', '${size}', this.value)">
                    <button class="button-plus-quantity" onclick="decreaseQuantity('${product.id}', '${size}')">-</button>
                </div>

                <div class="products-price-cart">
                    ${hasDiscount ? `
                        <p><span style="color: red; text-decoration: line-through;">${product.price} Грн.</span></br> ${product.discount} Грн.</p>
                    ` : `
                        <p>${product.price} Грн.</p>
                    `}
                </div>

                <div class="products-button-card">
                    <div class="icone_delete__products"><button onclick="removeProductFromCart('${product.id}', '${size}')"><img src="asets/imgs/icons8-delete.png" alt="icones8-delete.png"/></button></div>
                </div>
            </div>

            
        </div>
    </div>
    `;
}


function displayCartProducts() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartContainer = document.getElementById('cart-container');
    const totalPriceContainer = document.getElementById('total_price-cart');
    const emptyCartContainer = document.getElementById('cart-products-not-products'); // блок, який містить повідомлення про порожній кошик

    if (!cartContainer || !totalPriceContainer || !emptyCartContainer) {
        console.error("Cart container or total price container not found!");
        return;
    }

    // Очищаємо контейнер перед додаванням нових продуктів
    cartContainer.innerHTML = '';

    if (cartItems.length === 0) {
        // Якщо кошик порожній, відображаємо повідомлення про порожній кошик
        emptyCartContainer.style.display = 'block';
        totalPriceContainer.textContent = '0 Грн.'; // скидаємо вартість до нуля
    } else {
        emptyCartContainer.style.display = 'none'; // приховуємо повідомлення, якщо є продукти у кошику
        let totalCartPrice = 0; // Ініціалізуємо загальну суму

        cartItems.forEach(item => {
            const product = CATALOG.find(product => product.id === item.id);
            if (product) {
                const itemPrice = product.discount ? product.discount : product.price;
                totalCartPrice += itemPrice * item.quantity;
                const productHTML = createCartProductCard(product, item.size, item.quantity);
                cartContainer.innerHTML += productHTML;
            }
        });

        // Відображаємо загальну суму у контейнері
        totalPriceContainer.textContent = `${totalCartPrice.toFixed(2)} Грн.`;
    }
}

// Функція для переходу на сторінку продукта
function redirectToProduct(productId) {
    window.location.href = `productsCard.html?id=${productId}`;
}

// Функция для отображения продуктов в корзине
function displayCartProducts() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartContainer = document.getElementById('cart-container');
    const totalPriceContainer = document.getElementById('total_price-cart'); // Получаем контейнер для общей суммы
    if (!cartContainer || !totalPriceContainer) {
        console.error("Cart container or total price container not found!");
        return;
    }

    // Очищаем контейнер перед добавлением новых продуктов
    cartContainer.innerHTML = '';

    // Добавляем карточки продуктов в корзине в контейнер
    let totalCartPrice = 0; // Инициализируем общую сумму
    cartItems.forEach(item => {
        const product = CATALOG.find(product => product.id === item.id);
        if (product) {
            // Расчет цены с учетом скидки для каждого товара
            const itemPrice = product.discount ? product.discount : product.price;
            totalCartPrice += itemPrice * item.quantity; // Увеличиваем общую сумму
            const productHTML = createCartProductCard(product, item.size, item.quantity); // передаем размер и количество
            cartContainer.innerHTML += productHTML;
        }
    });

    // Отображаем общую сумму в контейнере
    totalPriceContainer.textContent = `${totalCartPrice.toFixed(2)} Грн.`; // Округляем до двух знаков после запятой

    // После отображения продуктов, обновим общее количество товаров
    updateTotalQuantity(cartItems);
}



// Функция для добавления или удаления продукта из избранного
function toggleSavedCart(productId) {
    const savedCart = JSON.parse(localStorage.getItem('savedCart')) || [];
    const productIndex = savedCart.indexOf(productId);
    
    if (productIndex === -1) {
        // Если продукт не найден в избранном, добавляем его
        savedCart.push(productId);
    } else {
        // Если продукт найден в избранном, удаляем его
        savedCart.splice(productIndex, 1);
    }

    // Обновляем данные в localStorage
    localStorage.setItem('savedCart', JSON.stringify(savedCart));
    
    // Перерисовываем карточки продуктов
    displayCartProducts();
    displaySavedProducts(); // Добавляем обновление списка избранного
}
function displaySavedProducts() {}




// Функция для обновления видимости кнопки "Очистить корзину"
function updateClearCartButtonVisibility() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const clearCartButton = document.getElementById('clear-cart-button');
    if (cartItems.length === 0) {
        clearCartButton.style.display = 'none'; // скрываем кнопку
    } else {
        clearCartButton.style.display = 'block'; // показываем кнопку
    }
}

// Функция для очистки корзины
function clearCart() {
    // Просто очищаем localStorage для ключа 'cartItems'
    localStorage.removeItem('cartItems');
    // Перерисовываем корзину
    displayCartProducts();
    // Обновляем видимость кнопки "Очистить корзину"
    updateClearCartButtonVisibility();
    // Обновляем общее количество товаров
    updateTotalQuantity();
}

document.addEventListener('DOMContentLoaded', () => {
    // Вызываем функцию для отображения продуктов в корзине на странице
    displayCartProducts();
    // Проверяем, есть ли продукты в корзине, и скрываем/показываем кнопку "Очистить корзину" соответственно
    updateClearCartButtonVisibility();
});




// Функция для удаления продукта из корзины
function removeProductFromCart(productId, size) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems = cartItems.filter(item => !(item.id === productId && item.size === size));
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    displayCartProducts();
    // Обновляем общее количество товаров
    updateTotalQuantity();
}



// Функция для проверки, есть ли продукт уже в избранном
function isProductSaved(productId) {
    const savedCart = JSON.parse(localStorage.getItem('savedCart')) || [];
    return savedCart.includes(productId);
}



// Функция для уменьшения количества товара
function decreaseQuantity(productId, size) {
    const quantityInput = document.getElementById(`quantity-${productId}-${size}`);
    let quantity = parseInt(quantityInput.value);
    if (quantity > 1) {
        quantity--;
        quantityInput.value = quantity;
        updateCartQuantity(productId, size, quantity);
        // Обновляем общее количество товаров
        updateTotalQuantity();
    }
}



// Функция для увеличения количества товара
function increaseQuantity(productId, size) {
    const quantityInput = document.getElementById(`quantity-${productId}-${size}`);
    let quantity = parseInt(quantityInput.value);
    quantity++;
    quantityInput.value = quantity;
    updateCartQuantity(productId, size, quantity);
    // Обновляем общее количество товаров
    updateTotalQuantity();
}



// Функция для обновления количества товара в корзине в localStorage
function updateCartQuantity(productId, size, value) {
    // Проверяем, является ли введенное значение числом
    if (!isNaN(value) && value > 0) {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const cartIndex = cartItems.findIndex(item => item.id === productId && item.size === size);
        if (cartIndex !== -1) {
            cartItems[cartIndex].quantity = parseInt(value);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            // Перерисовываем список товаров в корзине
            displayCartProducts();
        }
    } else {
        // Если введено не число или значение меньше или равно 0, устанавливаем 1
        document.getElementById(`quantity-${productId}-${size}`).value = 1;
    }
    // Обновляем общее количество товаров
    updateTotalQuantity();
}



// Функция для обновления общего количества товаров в корзине
function updateTotalQuantity(cartItems) {
    const totalQuantityElement = document.getElementById('total-quantity-html');
    if (totalQuantityElement) {
        const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
        totalQuantityElement.textContent = totalQuantity;
    }
}




// Вивід інформаціїї про кошик загальної суми скидок і т.д
let createCartInfoTotalPrice = `
    <div class="cart-info-total-price-flex">

        <div>
            <div class="bonus-buton-container">
                <p>БОНУСИ</p>
                <div id="promo-code-container">
                    <div><input type="text" id="promo-code-input" placeholder="Введіть промокод"></div>
                    <div><button id="apply-promo-code-button">Застосувати</button></div>
                </div>
            </div>
            <div class="total_price-cart-container">
                <p>СУМА ДО ОПЛАТИ ЗА ТОВАР</p>
                <div id="total_price-cart"></div>
            <div>
            <div class="button-go-to-buy">
                <button><p>ДО ЗАМОВЛЕННЯ</p></button>
            </div>
        </div>
    <div>
    
    `;
document.getElementById('cart-info-total-price').innerHTML = createCartInfoTotalPrice;






// Форма створення замовлення
let formOrderProducts = `
    <form id="order_form">
    <h2 class="order-heading">ОФОРМЛЕННЯ ЗАМОВЛЕННЯ</h2>
        <div class="form_order__product-container">
            <div>
                <h3 class="customer-info-heading">ДАНІ ПОКУПЦЯ</h3>
                <div class="customer-info">
                    <label for="first-name">Ім'я:</label>
                    <input type="text" id="first-name" class="first-name" name="first_name" placeholder="Ім'я">
                </div>
                <div class="customer-info">
                    <label for="last-name">Прізвище:</label>
                    <input type="text" id="last-name" class="last-name" name="last_name" placeholder="Прізвище">
                </div>
                <div class="customer-info">
                    <label for="patronymic">По батькові:</label>
                    <input type="text" id="patronymic" class="patronymic" name="patronymic" placeholder="По батькові">
                </div>
                <div class="customer-info">
                    <label for="phone">Телефон:</label>
                    <input type="text" value="+380" id="phone" name="phone" oninput="formatPhoneNumber(this)">
                </div>
            </div>
            <div>
                <h3 class="delivery-info-heading">ДОСТАВКА</h3>
                <div class="delivery-info">
                    <label for="delivery">Спосіб доставки:</label>
                    <select id="delivery" name="delivery">
                        <option value="nova_poshta">Нова Пошта</option>
                        <!-- Додайте інші варіанти доставки, якщо потрібно -->
                    </select>
                </div>
                <div class="delivery-info">
                    <label for="region">Область:</label>
                    <select id="region" name="region">
                        <option value="oblast_1">Оберіть область</option>
                        <!-- Додайте варіанти областей, наприклад: <option value="oblast_1">Область 1</option> -->
                    </select>
                </div>
                <div class="delivery-info">
                    <label for="city">Місто:</label>
                    <select id="city" name="city">
                        <option value="city_1">Спочатку виберіть область</option>
                        <!-- Додайте варіанти міст, наприклад: <option value="city_1">Місто 1</option> -->
                    </select>
                </div>
                <div class="delivery-info">
                    <label for="post_office">Відділення:</label>
                    <select id="post_office" name="post_office">
                        <option value="post_office_1">Спочатку виберіть місто</option>
                        <!-- Додайте варіанти відділень, наприклад: <option value="post_office_1">Відділення 1</option> -->
                    </select>
                </div>
            </div>
            <div>
                <h3 class="payment-info-heading">ОПЛАТА</h3>
                <div class="payment-info">
                    <label for="payment">Спосіб оплати:</label><br>
                    <div class="payment-info-aply">
                        <input type="radio" id="payment_on_delivery" name="payment" value="payment_on_delivery">
                        <label for="payment_on_delivery">Оплата при отриманні</label>
                    </div>
                    <div class="payment-info-aply">
                        <input type="radio" id="payment_by_card" name="payment" value="payment_by_card">
                        <label for="payment_by_card">Оплатити карткою Visa/MasterCard</label>
                    </div>
                </div>
                <div class="payment-info">
                    <label for="comment">Коментар до замовлення:</label><br>
                    <textarea id="comment" name="comment" rows="4" cols="50"></textarea>
                </div>
                <div class="register">
                    <input type="checkbox" id="register" name="register">
                    <label for="register">Хочу зареєструватися</label>
                </div>
            </div>
        </div>
        <div class="submit-button">
            <button type="submit">ОФОРМИТИ ЗАМОВЛЕННЯ</button>
        </div>
    </form>
`;

document.getElementById('form_order__product').innerHTML = formOrderProducts;


function formatPhoneNumber(input) {
    // Перевіряємо, чи введено значення +380
    if (!input.value.startsWith('+380')) {
        // Якщо не введено, повертаємо значення на початок
        input.value = '+380';
    }

    // Замінюємо всі символи, крім цифр та "+", на порожній рядок
    input.value = input.value.replace(/[^0-9+]/g, '');

    // Обмежуємо введення до 13 символів (+380 та 9 цифр)
    if (input.value.length > 13) {
        input.value = input.value.slice(0, 13);
    }
}









// функція для скриття всього лишнього в кошику 
function displayCartProducts() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartContainer = document.getElementById('cart-container');
    const totalPriceContainer = document.getElementById('total_price-cart');
    const emptyCartContainer = document.getElementById('not-products-productsCart');
    const cartInfoContainer = document.getElementById('cart-info-total-price'); // Добавлено получение контейнера с информацией о цене
    const orderFormContainer = document.querySelector('.cart-cont__form-order'); // Получаем контейнер с формой заказа

    if (!totalPriceContainer || !emptyCartContainer || !cartInfoContainer) {
        console.error("Total price container, empty cart container, or cart info container not found!");
        return;
    }

    if (cartItems.length === 0) {
        // Если корзина пуста, отображаем блок not-products-productsCart и скрываем контейнеры с продуктами и информацией о цене
        emptyCartContainer.style.display = 'grid';
        cartContainer.style.display = 'none';
        cartInfoContainer.style.display = 'none'; // Скрываем контейнер с информацией о цене
        orderFormContainer.style.display = 'none';
        totalPriceContainer.textContent = '0 Грн.'; // Устанавливаем нулевую стоимость
    } else {
        // Если в корзине есть продукты, скрываем блок not-products-productsCart и отображаем контейнеры с продуктами и информацией о цене
        emptyCartContainer.style.display = 'none';
        cartContainer.style.display = 'grid';
        cartInfoContainer.style.display = 'block'; // Отображаем контейнер с информацией о цене
        orderFormContainer.style.display = 'block';
        let totalCartPrice = 0; // Инициализируем общую стоимость

        cartContainer.innerHTML = ''; // Очищаем контейнер перед добавлением новых продуктов

        cartItems.forEach(item => {
            const product = CATALOG.find(product => product.id === item.id);
            if (product) {
                const itemPrice = product.discount ? product.discount : product.price;
                totalCartPrice += itemPrice * item.quantity;
                const productHTML = createCartProductCard(product, item.size, item.quantity);
                cartContainer.innerHTML += productHTML;
            }
        });

        // Отображаем общую стоимость в контейнере
        totalPriceContainer.textContent = `${totalCartPrice.toFixed(2)} Грн.`;
    }
}


// Обработчик события загрузки контента страницы
document.addEventListener('DOMContentLoaded', () => {
    // Вызываем функцию для отображения продуктов в корзине на странице
    displayCartProducts();
});