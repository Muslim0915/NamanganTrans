import { showError } from "./customFunctions/showError.js";
import {removeErrors} from "./customFunctions/removeErrors.js";

const form = document.querySelector('.form');
const userId = document.querySelector('.user-id');
const storedData = JSON.parse(localStorage.getItem('swipers')) || [];

const currentDate = new Date();
const year = currentDate.getFullYear();
let month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
let day = currentDate.getDate().toString().padStart(2, '0');

const formattedDate = `${year}-${month}-${day}`;

// Функция для генерации уникального 6-значного числа
function generateUniqueId() {
    let id;
    do {
        id = Math.floor(100000 + Math.random() * 900000);
    } while (isIdUsed(id));
    return id.toString().replace(/(\d{3})(\d{3})(\d{3})/, "$1-$2-$3");
}

function isIdUsed(id) {
    return storedData.some(driver => driver.id === id);
}

// Добавляем обработчик события для input[type="file"]
const fileInput = document.querySelector('input[name="file"]');
fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const dataURL = e.target.result;
            localStorage.setItem('uploadedImage', dataURL);
        };
        reader.readAsDataURL(file);
    }
});

function checkValid(event) {
    event.preventDefault();
    removeErrors();

    let name = document.querySelector('input[name="name"]');
    let about = document.querySelector('input[name="about"]');
    let rate = document.querySelector('input[name="rate"]');
    let newDriver = {
        id: generateUniqueId(),
        date: formattedDate,
        title: name.value,
        text: about.value,
        rate: rate.value,
        src: localStorage.getItem('uploadedImage') // Используем сохраненное изображение из Local Storage
    };
    if (name.value === '' || about.value === '' || rate.value === '' || fileInput.value === '') {
        showError(name, 'Foydalanuvchi ismi to\'ldirilsin');
        showError(about, 'Foydalanuvchi haqida malumot to\'ldirilsin');
        showError(rate, 'Foydalanuvchi reytingi to\'ldirilsin');
        showError(fileInput, 'Foydalanuvchi rasm to\'ldirilsin');
    }
    else if(newDriver.rate < 1 || newDriver.rate > 5) {
        showError(rate, 'Foydalanuvchi reytingi 1 dan 5 gacha bo\'lishi kerak');
    }
    else {

        storedData.push(newDriver);
        localStorage.setItem('swipers', JSON.stringify(storedData));
        form.reset();
        userId.innerHTML = `Haydovchi ID: <span> ${newDriver.id} </span> `;
    }
}


form.addEventListener('submit', (event) => checkValid(event));
