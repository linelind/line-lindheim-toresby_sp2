const form = document.querySelector(".login-form");
const username = document.querySelector("#username");
const usernameError = document.querySelector("#usernameError");
const password = document.querySelector("#password");
const passwordError = document.querySelector("#passwordError");

function validateForm(event) {
    event.preventDefault();

    if (checkLength(username.value, 0) === true) {
        usernameError.style.display = "none";
    } else {
        usernameError.style.display = "block";
    }

    if (checkLength(password.value, 0) === true) {
        passwordError.style.display = "none";
    } else {
        passwordError.style.display = "block";
    }
}

form.addEventListener("submit", validateForm);

function checkLength(value, len) {
    if (value.trim().length > len) {
        return true;
    } else {
        return false;
    }
}
