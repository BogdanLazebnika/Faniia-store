document.addEventListener('dblclick', function(event) {
    event.preventDefault();
  });


function updateTotalQuantity() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let totalQuantity = 0;
    
    // Считаем общее количество товаров в корзине
    cartItems.forEach(item => {
        totalQuantity += item.quantity || 0; // учитываем количество каждого товара
    });
    
    // Находим элемент, в который нужно вывести общее количество товаров
    const totalQuantityElement = document.getElementById('total-qualiti__html');
    if (totalQuantityElement) {
        // Обновляем значение элемента
        totalQuantityElement.textContent = totalQuantity;
    }
}

// Вызываем функцию для обновления общего количества товаров при загрузке страницы
updateTotalQuantity();