import { displayMessage } from "./ui/displayMessage.js";
import { saveToken, saveUser } from "./utils/storage.js";
import { baseUrl } from "./settings/api.js";

const form = document.querySelector(".login-form");
const username = document.querySelector("#username");
const usernameError = document.querySelector("#usernameError");
const password = document.querySelector("#password");
const passwordError = document.querySelector("#passwordError");
const formMessage = document.querySelector(".message-container");

form.addEventListener("submit", submitForm);

function submitForm(event) {
    event.preventDefault();

    formMessage.innerHTML = "";

    const usernameValue = username.value.trim();
    const passwordValue = password.value.trim();

    if (usernameValue.length === 0 || passwordValue === 0) {
        return displayMessage("warning", "Please fill out the form", ".message-container");
    }

    doLogin(usernameValue, passwordValue);
}

async function doLogin(username, password) {
    const url = baseUrl + "auth/local";

    const data = JSON.stringify({ identifier: username, password: password });

    const options = {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json",
        },
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();

        if (json.user) {
            saveToken(json.jwt);
            saveUser(json.user);

            location.href = "admin.html";
        }

        if (json.error) {
            displayMessage("error", "Invalid login details", ".message-container");
        }
    } catch (error) {
        displayMessage("error", "Oh no! Something went wrong", ".message-container");
    }
}

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
