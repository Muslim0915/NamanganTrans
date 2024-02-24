import { showError } from "./customFunctions/showError.js";
import { swipers } from "./components/swipers.js";

const form = document.querySelector('.form');

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
    return swipers.some(driver => driver.id === id);
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

    if (name.value === '' || about.value === '' || rate.value === '' || fileInput.value === '') {
        showError(name, 'Foydalanuvchi ismi to\'ldirilsin');
        showError(about, 'Foydalanuvchi haqida malumot to\'ldirilsin');
        showError(rate, 'Foydalanuvchi reytingi to\'ldirilsin');
        showError(fileInput, 'Foydalanuvchi rasm to\'ldirilsin');
    } else {
        let newDriver = {
            id: generateUniqueId(),
            date: formattedDate,
            name: name.value,
            about: about.value,
            rate: rate.value,
            src: localStorage.getItem('uploadedImage') // Используем сохраненное изображение из Local Storage
        };

        swipers.push(newDriver);
        localStorage.setItem('drivers', JSON.stringify(swipers));
        location.href = 'index.html';
    }
}

function removeErrors() {
    document.querySelectorAll('.error').forEach(element => element.remove());
}

form.addEventListener('submit', (event) => checkValid(event));
