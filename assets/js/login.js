import {showError} from "./customFunctions/showError.js";

const form = document.querySelector('.form');
const admin = {
    name: 'admin',
    password: 'admin',
}
function checkValid(event) {
    removeErrors();
    event.preventDefault();
    console.log(event)
    let name = document.querySelector('input[name="name"]');
    let password = document.querySelector('input[name="password"]');
    if (name.value === admin.name && password.value === admin.password) {
        window.location.href = 'admin.html'
    } else {
        showError(name, 'Login yoki parol noto\'g\'ri');
        showError(password, 'Login yoki parol noto\'g\'ri');
    }

}
function removeErrors() {
    document.querySelectorAll('.error').forEach(element => element.remove());
}

form.addEventListener('submit',(event)=> checkValid(event));
