// Header top menu
let TemplateTopMenu =`
    <div class="header__top-menu">
        <div class="container">
            <div class="left__top-menu hiden__md__down">
                <ul class="left__top-menu-ul">
                    <li class="top__menu-li"><a href="shop.html" class="link__top-menu">Магазин</a></li>
                    <li class="top__menu-li opener-button"><a class="link__top-menu">Допомога <b class="Strong">&bigtriangledown;</b></a>
                    <div class="container__opener__menu">
                        <ul class="open_menu-top-ul ">
                            <li class="open_menu-top-li"><a class="opener__menu-a" href="#">Про нас</a></li>
                            <li class="open_menu-top-li"><a class="opener__menu-a" href="#">Оплата та доставка</a></li>
                            <li class="open_menu-top-li"><a class="opener__menu-a" href="#">Повернення та обмін</a></li>
                            <li class="open_menu-top-li"><a class="opener__menu-a" href="#">Питання та відповіді</a></li>
                        </ul>
                    </div>
                    </li>
                    <li class="top__menu-li"><a href="#" class="link__top-menu">Блог</a></li>
                    <li class="top__menu-li"><a href="#" class="link__top-menu">Контакти</a></li>
                </ul>
            </div>
            <div class="center__top-menu">
                <a href="tel:+380683296960" class="header_phone-center"><span class="mobile__phone-center-menu">+38 068 329 6960</span></a>
            </div>
            <div class="right__top-menu">
                <div class="option-language">
                    <span>UA <b class="Strong">&bigtriangledown;</b></span>
                </div>
                <div class="gmeil__righ-top">
                    <a href="mailto:gmail@da.com" class="header__gmail-content"><span>gmail@da.com</span></a>
                </div>
            </div>
        </div>
    </div>`
document.getElementById('header__top-menu-id').innerHTML = TemplateTopMenu;





// Header center menu
let TemplateCenterMenu =`
<div class="header__center">
            <container class="container">
                <div class="center__header-categories">
                    <nav class="center__header-nav">
                        <ul class="nav__center__navigation">
                            <li class="nav__li__options"><a href="#" class="nav__cenet__button">Дівчинка</a></li>
                            <li class="nav__li__options"><a href="#" class="nav__cenet__button">Хлопчик</a></li>
                            <li class="nav__li__options"><a href="#" class="nav__cenet__button">Немовля</a></li>
                        </ul>
                    </nav>
                </div>
                <div class="center__logotipe-center">
                    <div class="logotipe-center-pc">
                        <a href="index.html" class="logotipe__hover-center-pc">
                            <div class="logotipe__content-center">
                                <H1 class="option-logotipe-pc">Faniia</H1>
                                <!-- <H2 class="option__bottom_logotipe">children's costumes</H2> -->
                            </div>
                        </a>
                    </div>
                </div>
                <div class="right__center__menu">
                    <ul class="right__menu_ul">
                        <li class="right__menu__li"><a href="#" class="right__menu__a"><img src="asets/imgs/icons8-lupa.png" alt="icons8-lupa"></a></li>
                        <li class="right__menu__li"><a href="#" class="right__menu__a"><img src="asets/imgs/icons8-acount.png" alt="icons8-acount"><span class="counter__right-menu"></span></a></li>
                        <li class="right__menu__li"><a href="#" class="right__menu__a"><img src="asets/imgs/icons8-phone.png" alt="icons8-phone"><span class="counter__right-menu"></span></a></li>
                        <li class="right__menu__li"><a href="savedCart.html" class="right__menu__a"><img src="asets/imgs/icons8-saved.png" alt="icons8-saved"><span class="counter__right-menu"> </span></a></li> 
                        <li class="right__menu__li last__child"><a href="cart.html" class="right__menu__a"><img src="asets/imgs/icons8-bag.png" alt="icons8-bag"><span class="counter__right-menu" id="total-qualiti__html">0</span></a></li>
                    
                    </ul>
                </div>
                
            </container>
        </div>`
document.getElementById('header__center-menu-id').innerHTML = TemplateCenterMenu




