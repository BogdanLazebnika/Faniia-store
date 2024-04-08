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

/// Функція для створення HTML-розмітки картки продукту зі збережених
function createSavedProductCard(product) {
    const hasDiscount = product.discount !== undefined && product.discount !== null && product.discount !== "";
    const discountPercentage = hasDiscount ? Math.round((1 - (product.discount / product.price)) * 100) : 0;

    return `
    <div class="products_save_container">
        <div class="products-contaier-saved">
            
            

            <div class="products-saved-button">
                <img class="image-products-save-icons" src="asets/imgs/icons8-heart-off-like.png" alt="Видалити з обраного" onclick="removeProductFromSaved('${product.id}')"/>
            </div>

            <div class="products-saved-images">
                <img class="prducts__card__img" src="${product.img}" alt="${product.name}" onclick="redirectToProduct('${product.id}')">            
            </div>

            <div class="product-card-saved" id="${product.id}">
                <div>
                    <div class="products_name-container">
                        <h3 class="name-text-saved">${product.name}</h3>
                    </div>
                    <div class="price__products-container">
                        ${hasDiscount ? `
                            <p class="product__price_not_discount"><span style="color: red; text-decoration: line-through;" class="product__price_yes_discount">${product.price} Грн.</span></p>
                            <p style="color: red;" class="products__discount_price">${product.discount} Грн.</p>
                            <p class="discount-per-cent">-${discountPercentage}%</p>
                        ` : `
                            <p class="product__price_not_discount">${product.price} Грн.</p>
                        `}
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
}
// Функция для перехода на страницу продукта при нажатии на изображение
function redirectToProduct(productId) {
    window.location.href = `productsCard.html?id=${productId}`;
}

// Вызываем функцию для отображения продуктов на странице
displaySavedProducts();