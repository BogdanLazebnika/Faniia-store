// productsCard.js

// Получаем id выбранного продукта из URL
const urlParams = new URLSearchParams(window.location.search);
const selectedProductId = urlParams.get('id');

// Находим выбранный продукт по его id в массиве CATALOG
const selectedProduct = CATALOG.find(product => product.id === selectedProductId);

// Функция для отображения информации о продукте на странице с выбором размера
function displayProductInfo(product) {
    const productContainer = document.getElementById('product-container');
    if (!productContainer) {
        console.error("Product container not found!");
        return;
    }

    // Создаем HTML-разметку для отображения информации о продукте
    const productHTML = `
        <div class="product-details">
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Brand: ${product.brand}</p>
            <p>Price: $${product.price}</p>
            <p>Size: 
                <div id="size-buttons">
                    ${createSizeButtons(product.size)}
                </div>
            </p>
            <button id="add-to-cart-btn" onclick="addToCart('${product.id}')" disabled>Add to Cart</button>
        </div>
    `;

    // Добавляем HTML-разметку на страницу
    productContainer.innerHTML = productHTML;
}

// Функция для создания кнопок размера
function createSizeButtons(sizes) {
    return sizes
        .split(' ')
        .map(size => `<button onclick="selectSize(this)">${size}</button>`)
        .join('');
}

// Функция для выбора размера
function selectSize(button) {
    const sizeButtons = document.querySelectorAll('#size-buttons button');
    sizeButtons.forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    addToCartBtn.disabled = false;
}

// Функция для добавления выбранного продукта в корзину с учетом размера
function addToCart(productId) {
    const selectedSizeButton = document.querySelector('#size-buttons button.selected');
    const selectedSize = selectedSizeButton ? selectedSizeButton.innerText : '';

    // Проверяем, выбран ли размер
    if (!selectedSize) {
        console.error("Please select a size!");
        return;
    }

    // Создаем объект с информацией о выбранном продукте
    const selectedProduct = {
        id: productId,
        size: selectedSize
    };

    // Получаем текущую корзину из localStorage
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Проверяем, есть ли уже товар с таким же id и размером в корзине
    const existingItemIndex = cartItems.findIndex(item => (
        item.id === productId &&
        item.size === selectedSize
    ));

    // Если такой товар уже есть в корзине, обновляем его количество
    if (existingItemIndex !== -1) {
        cartItems[existingItemIndex].quantity++; // увеличиваем количество товара
    } else {
        // Иначе добавляем новый товар в корзину
        selectedProduct.quantity = 1; // устанавливаем количество товара в 1
        cartItems.push(selectedProduct);
    }

    // Сохраняем обновленную корзину в localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Обновляем общее количество товаров
    updateTotalQuantity();
}

// Функция для отображения маленьких картинок и ссылок на страницу продукта с тем же типом
function displayRelatedProducts(productType) {
    const relatedProductsContainer = document.getElementById('related-products-container');
    if (!relatedProductsContainer) {
        console.error("Related products container not found!");
        return;
    }

    // Фильтруем каталог, чтобы найти продукты с тем же типом, но с другими id
    const relatedProducts = CATALOG.filter(product => product.type === productType && product.id !== selectedProductId);

    // Создаем HTML-разметку для каждого связанного продукта
    const relatedProductsHTML = relatedProducts.map(product => `
        <div class="related-product">
            <a href="productsCard.html?id=${product.id}">
                <img src="${product.img}" alt="${product.name}">
                <p>${product.name}</p>
            </a>
        </div>
    `).join('');

    // Добавляем HTML-разметку на страницу
    relatedProductsContainer.innerHTML = relatedProductsHTML;
}

// Если продукт найден, отображаем его информацию на странице и связанные продукты
if (selectedProduct) {
    displayProductInfo(selectedProduct);
    displayRelatedProducts(selectedProduct.type);
} else {
    console.error("Selected product not found!");
}