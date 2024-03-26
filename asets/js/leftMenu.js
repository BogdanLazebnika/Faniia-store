    // Left mobile menu
    
    let LeftMobileMenu=`
        <div class="left-mobile_menu">
        <div class="open__menu__icones__adaptive-container">

            <button id="open__menu__icones__adaptive" class="dispon" alt="">
                <img id="menuIcon" src="asets/imgs/icons8-menu.png" class="icon" alt="icons8-menu">
            </button>


        </div>
            
            <div class="mobile__menu__adptive">

                <div id="container__menu-adaptive" class="container-adaptive-menu disp">
                    <nav class="adaptive__menu-list">
                        <li class="li__adaptie_menu-a"><a href="#" class="adaptive__menu-a">Головна сторінкa</a></li>
                        <li class="li__adaptie_menu-a"><a href="shop.html" class="adaptive__menu-a">Магазин</a></li>
                        <li class="li__adaptie_menu-a"><a href="#" class="adaptive__menu-a">Допомога</a></li>
                        <li class="li__adaptie_menu-a"><a href="#" class="adaptive__menu-a">Блог</a></li>
                        <li class="li__adaptie_menu-a"><a href="" class="adaptive__menu-a">Контакти</a></li>
                    </nav>
                </div>

            </div>
        </div>
        </div>`
document.getElementById('left-mobile_menu-id').innerHTML = LeftMobileMenu
    
    
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