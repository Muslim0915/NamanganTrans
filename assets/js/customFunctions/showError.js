export function  showError(field, message) {
    const errorElement = document.createElement('small');
    errorElement.classList.add('error');
    errorElement.classList.add('errorShow');
    errorElement.innerHTML = message;
    field.closest('.form-control').appendChild(errorElement);
}