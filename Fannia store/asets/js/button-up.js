// Функція для прокрутки сторінки до верхньої частини
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Плавна анімація прокрутки
    });
}

// Показати або приховати кнопку, коли користувач прокручує сторінку
window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    var scrollToTopBtn = document.getElementById("scrollToTopBtn");

    // Показати кнопку, коли користувач прокрутив більше 300 пікселів від верху сторінки
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
}