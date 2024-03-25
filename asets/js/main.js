// бокове меню
const buttonMenu = document.getElementById('open__menu__icones__adaptive');
const menu = document.getElementById('container__menu-adaptive');
const menuIcon = document.getElementById('menuIcon');

// Запобігання появи бокового меню після заупска сайту
menu.classList.remove('disp');
setTimeout(() => {
    menu.style.display = 'inline';
}, 1);

buttonMenu.addEventListener('click', (event) => {
    event.stopPropagation();
    menu.classList.toggle('disp');

    // Изменение иконки кнопки при открытии/закрытии меню
    if (menu.classList.contains('disp')) {
        menuIcon.src = 'asets/imgs/icons8-close.png';
    } else {
        menuIcon.src = 'asets/imgs/icons8-menu.png';
    }
});

document.addEventListener('click', (event) => {
    if (!menu.contains(event.target) && event.target !== buttonMenu) {
        menu.classList.remove('disp');
        
        // Возвращение иконки к изначальному состоянию при закрытии меню
        menuIcon.src = 'asets/imgs/icons8-menu.png'; 
    }
});

window.addEventListener('scroll', () => {
    if (menu.classList.contains('disp')) {
        menu.classList.remove('disp');
        
        // Возвращение иконки к изначальному состоянию при закрытии меню при прокрутке
        menuIcon.src = 'asets/imgs/icons8-menu.png';
    }
});

menu.addEventListener('touchmove', (event) => {
    event.preventDefault();
}, { passive: false });





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