// savedCart.js

// Функция для удаления продукта из избранного
function removeProductFromSaved(productId) {
    let savedCart = JSON.parse(localStorage.getItem('savedCart')) || [];
    const productIndex = savedCart.indexOf(productId);
    if (productIndex !== -1) {
        savedCart.splice(productIndex, 1);
        localStorage.setItem('savedCart', JSON.stringify(savedCart));
        // Перерисовываем карточки продуктов из избранного
        displaySavedProducts();
    }
}

// Функция для отображения продуктов из избранного
function displaySavedProducts() {
    const savedCart = JSON.parse(localStorage.getItem('savedCart')) || [];

    const savedProductsContainer = document.getElementById('saved-products-container');
    if (!savedProductsContainer) {
        console.error("Saved products container not found!");
        return;
    }

    // Очищаем контейнер перед добавлением новых продуктов
    savedProductsContainer.innerHTML = '';

    // Добавляем карточки продуктов из избранного в контейнер
    savedCart.forEach(productId => {
        const product = CATALOG.find(product => product.id === productId);
        if (product) {
            const productHTML = createSavedProductCard(product);
            savedProductsContainer.innerHTML += productHTML;
        }
    });
}

/// Функция для создания HTML-разметки карточки продукта из избранного
function createSavedProductCard(product) {
    return `
    <img src="asets/imgs/icons8-heart-off-like.png" alt="Remove from Favorites" onclick="removeProductFromSaved('${product.id}')">
        <div class="product-card" id="${product.id}">
            <img src="${product.img}" alt="${product.name}" onclick="redirectToProduct('${product.id}')">
            <h3>${product.name}</h3>
            <p>Brand: ${product.brand}</p>
            <p>Price: $${product.price}</p>
            <p>Size: ${product.size}</p>
        </div>
    `;
}

// Функция для перехода на страницу продукта при нажатии на изображение
function redirectToProduct(productId) {
    window.location.href = `productsCard.html?id=${productId}`;
}

// Вызываем функцию для отображения продуктов на странице
displaySavedProducts();