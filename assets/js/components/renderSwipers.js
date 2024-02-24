import {showError} from "../customFunctions/showError.js";

const renderSwipers = (data) => {
    const swiperContainer = document.querySelector('.swiper-wrapper');

    data.forEach(element => {
        const swiperSlide = document.createElement('div');
        swiperSlide.classList.add('swiper-slide');
        swiperSlide.innerHTML = `
            <div class="swiper__card">
                <div class="swiper__card-head">
                    <img alt="image" width="50" height="50" src="${element.src}">
                    <div class="swiper__card-title">
                    <h3>${element.title}</h3>
                    <p>${element.date}</p>
</div>
                </div>
                <div class="swiper__card-info">
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
const storedData = JSON.parse(localStorage.getItem('swipers')) || [];

const form = document.querySelector('header .form');
const searchInput = document.querySelector('.certificate__search-input');
const certificateContainer = document.querySelector('.certificate__container');

function searchCertificate(event) {
    event.preventDefault();
    const searchValue = searchInput.value.trim();
    const foundDriver = storedData.find(user => user.id === searchValue);
    if (foundDriver) {
        certificateContainer.innerHTML = "";
        certificateContainer.classList.add('active');
        certificateContainer.innerHTML = `
            <div class="certificate-info">
                <h2>Certificate ID: ${foundDriver.id}</h2>
                <p>Name: ${foundDriver.title}</p>
                <p>About: ${foundDriver.text}</p>
                <p class="rating">Rating: ${getStarRating(foundDriver.rate)}</p>
                <img src="${foundDriver.src}" alt="Certificate Image">
            </div>
        `;
    } else if (searchInput.value === "") {
        showError(searchInput, 'Search field cannot be empty');
    }
    else {
        showError(searchInput, 'Certificate not found');
    }
}

form.addEventListener('submit', searchCertificate);
window.onload = () => {
    renderSwipers(storedData)
};