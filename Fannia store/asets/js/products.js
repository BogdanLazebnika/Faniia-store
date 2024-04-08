// let createFilterContainerHTML = `
//     <div class="filter-button" onclick="toggleFilterWindow()">Фільтри</div>

//     <div id="filter-window" class="filter-window">
//         <div class="filter-container">

//             <div class="options__filter-div">
//                 <h1>Розмір</h1>
//                 <div class="content-filter-products-all" id="size-options">
//                     <!-- Варіанти розмірів будуть додані динамічно через JavaScript -->
//                 </div>
//             </div>

//             <div class="options__filter-div">
//                 <h1>Ціна</h1>
//                 <div id="price-slider"></div>
//                 <div class="price-range-container">
//                     <input type="text" id="price-range-min" readonly style="border:0; color:#f6931f; font-weight:bold;">
//                     <input type="text" id="price-range-max" readonly style="border:0; color:#f6931f; font-weight:bold;">
//                 </div>
//             </div>

//             <div class="options__filter-div">
//                 <h1>Сортування</h1>
//                 <div class="content-filter-products-all">
//                     <label for="filter-type">Категорія</label>
//                     <select id="filter-type">
//                         <option value="all">Всі</option>
//                     </select>
//                 </div>
//                 <div class="content-filter-products-all">
//                     <label for="sort-by">Сортувати</label>
//                     <select id="sort-by" onchange="applyFilters()">
//                         <option value="newest">Спочатку нові</option>
//                         <option value="oldest">Спочатку старі</option>
//                         <option value="lowest">Від дешевих до дорогих</option>
//                         <option value="highest">Від дорогих до дешевих</option>
//                         <option value="discount">Спочатку зі знижками</option>
//                     </select>
//                 </div>
//             </div>

//             <div class="options__filter-div">
//                 <button onclick="applyFilters()">Застосувати фільтр</button>
//                 <button onclick="resetFilters()">Скинути фільтр</button>
//             </div>

//         </div>
//     </div>
// `
// document.getElementById('filter').innerHTML = createFilterContainerHTML









// Функція для створення HTML-розмітки карточки продукта
function createProductCard(product) {
    const isProductInSavedCart = isProductSaved(product.id);
    const buttonImgSrc = isProductInSavedCart ? "asets/imgs/icons8-heart-off-like.png" : "asets/imgs/icons8-heart-on-like.png";
    const discountPercentage = Math.round((1 - (product.discount / product.price)) * 100); // Розрахунок відсотку знижки
    const hasDiscount = product.discount && product.discount > 0;

    return `
        <div class="products-card__container">
            <div class="product-card-shop" id="${product.id}">
                <div class="saved_products-button">
                    <img src="${buttonImgSrc}" onclick="toggleSavedCart('${product.id}')">
                </div>
                <div class="prducts__card-container__img">     
                    <img class="prducts__card__img" src="${product.img}" alt="${product.name}" onclick="redirectToProduct('${product.id}')">
               </div>
                <div class="botom_container_products">
                    <h3 class="products__name-products">${product.name}</h3>
                    <p class="product-size-products">${product.size}</p>
                    <p class="products-brand-products">Бренд: ${product.brand}</p>
                    <p class="products-type-products">Тип: ${product.typeClot}</p>
                    <div class="price__products-container">
                    <p class="product__price_not_discount">${hasDiscount ?`<span style="color: red; text-decoration: line-through;" class="product__price_yes_discount">${product.price} Грн.</span>` : `${product.price} Грн.`}</p>
                    ${hasDiscount ? `
                    <p style="color: red;" class="products__discount_price">${product.discount} Грн.</p>` : ''}
                    ${hasDiscount ? `
                    <p class="discount-per-cent">-${discountPercentage}%</p>` : ''}
                    </div>
                    <a href="productsCard.html?id=${product.id}" class="products-detail_product">Деталі</a>
                </div>
            </div>
        </div>`;
}

// Функція для перевірки, чи є продукт в обраному
function isProductSaved(productId) {
    const savedCart = JSON.parse(localStorage.getItem('savedCart')) || [];
    return savedCart.includes(productId);
}

function toggleSavedCart(productId) {
    const savedCart = JSON.parse(localStorage.getItem('savedCart')) || [];
    const productIndex = savedCart.indexOf(productId);

    if (productIndex === -1) {
        // Якщо продукт не знайдено в обраному, додайте його
        savedCart.push(productId);
    } else {
        // Якщо продукт знайдено в обраному, видаліть його
        savedCart.splice(productIndex, 1);
    }

    // Оновіть дані в localStorage
    localStorage.setItem('savedCart', JSON.stringify(savedCart));

    // Отримати елемент продукта за його id
    const productElement = document.getElementById(productId);
    
    // Отримати поточну картинку
    const currentImgSrc = productElement.querySelector('.saved_products-button img').src;

    // Змінити картинку залежно від того, чи відображається продукт у списку обраних
    if (currentImgSrc.includes("icons8-heart-on-like.png")) {
        productElement.querySelector('.saved_products-button img').src = "asets/imgs/icons8-heart-off-like.png";
    } else {
        productElement.querySelector('.saved_products-button img').src = "asets/imgs/icons8-heart-on-like.png";
    }
}

// Функція для переходу на сторінку продукта
function redirectToProduct(productId) {
    window.location.href = `productsCard.html?id=${productId}`;
}

// Функція для виведення продуктів з масиву в HTML
function displayProducts(products) {
    const productsContainer = document.getElementById('products-container');
    if (!productsContainer) {
        console.error("Контейнер продуктів не знайдено!");
        return;
    }

    // Очистити контейнер перед додаванням нових продуктів
    productsContainer.innerHTML = '';

    // Створити і додати карточки продуктів в контейнер
    products.forEach(product => {
        const productCardHTML = createProductCard(product);
        productsContainer.innerHTML += productCardHTML;
    });
}

// // Отримання значень з локального сховища
// const savedFilters = JSON.parse(localStorage.getItem('filters'));
// if (savedFilters) {
//     document.getElementById('filter-type').value = savedFilters.type;
//     document.getElementById('filter-price-min').value = savedFilters.minPrice;
//     document.getElementById('filter-price-max').value  = savedFilters.maxPrice;
//     document.getElementById('filter-size-min').value = savedFilters.minSize;
//     document.getElementById('filter-size-max').value = savedFilters.maxSize;
// }



// Викликати функцію для виведення продуктів на сторінку
displayProducts(CATALOG);

// Отримання елемента, що відображає продукти
const productsContainer = document.getElementById('products-container');

// Функція, яка завантажує додаткові продукти
function loadMoreProducts() {
    // Тут ви можете зробити запит на сервер за додатковими продуктами, наприклад, використовуючи AJAX або Fetch API
    // Після отримання даних додайте їх до контейнера з продуктами
    // Наприклад:
    // productsContainer.innerHTML += 'HTML-код нових продуктів';
}

// Обробник подій прокрутки
window.addEventListener('scroll', () => {
    // Перевіряємо, чи користувач дійшов до кінця сторінки
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        // Якщо так, завантажуємо додаткові продукти
        loadMoreProducts();
    }
});