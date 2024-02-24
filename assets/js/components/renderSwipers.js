import {swipers} from "./swipers.js";

const renderSwipers = (data) => {
    const swiperContainer = document.querySelector('.swiper-wrapper');

    data.forEach(element => {
        const swiperSlide = document.createElement('div');
        swiperSlide.classList.add('swiper-slide');
        swiperSlide.innerHTML = `
            <div class="swiper__card">
                <div class="swiper__card-img">
                    <img alt="image" src="${element.src}">
                </div>
                <div class="swiper__card-info">
                    <h3>${element.title}</h3>
                    <p>${element.date}</p>
                    <p>${element.text}</p>
                    <div class="rating">
                        ${getStarRating(element.rate)}
                    </div>
                </div>
            </div>
        `;
        swiperContainer.appendChild(swiperSlide);

    });

    let swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
}

const getStarRating = (rate) => {
    if (rate === null || rate === undefined) {
        return 'Not rated yet';
    } else {
        let stars = '';
        for (let i = 0; i < rate; i++) {
            stars += '<i class="fas fa-star"></i>';
        }
        return stars;
    }
}

const searchInput = document.querySelector('.certificate__search-input');

searchInput.addEventListener('input', (event) => {
    const searchTerm = searchInput.value.trim(); // Получаем текст из поля ввода

    // Фильтруем данные по введенному тексту
    const filteredData = swipers.filter(item => {
        // Здесь мы используем регулярное выражение для поиска только цифр в айди
        const regex = /^\d+$/; // Регулярное выражение для поиска только цифр
        return regex.test(searchTerm) && item.id.includes(searchTerm); // Проверяем, содержит ли айди введенные цифры
    });

    // Перерендериваем слайдер с отфильтрованными данными
    renderSwipers(filteredData);
})

const storedData = JSON.parse(localStorage.getItem('drivers')) || [];

window.onload = () => renderSwipers(storedData);