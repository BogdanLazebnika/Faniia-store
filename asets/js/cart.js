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

// Функция для очистки корзины
function clearCart() {
    // Просто очистите localStorage для ключа 'cartItems'
    localStorage.removeItem('cartItems');
    // Перерисуйте корзину
    displayCartProducts();
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


// Функция для удаления продукта из корзины
function removeProductFromCart(productId, size) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems = cartItems.filter(item => !(item.id === productId && item.size === size));
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    displayCartProducts();
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
    }
}

// Функция для увеличения количества товара
function increaseQuantity(productId, size) {
    const quantityInput = document.getElementById(`quantity-${productId}-${size}`);
    let quantity = parseInt(quantityInput.value);
    quantity++;
    quantityInput.value = quantity;
    updateCartQuantity(productId, size, quantity);
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

// Функция для обновления общего количества товаров в корзине
function updateTotalQuantity(cartItems) {
    const totalQuantityElement = document.getElementById('total-quantity-html');
    if (totalQuantityElement) {
        const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
        totalQuantityElement.textContent = totalQuantity;
    }
}

// Обработчик события загрузки контента страницы
document.addEventListener('DOMContentLoaded', () => {
    // Вызываем функцию для отображения продуктов в корзине на странице
    displayCartProducts();
});
