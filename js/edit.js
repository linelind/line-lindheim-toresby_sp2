import { baseUrl } from "./settings/api.js";
import { displayMessage } from "./ui/displayMessage.js";
import { updateProduct } from "./utils/updateProduct.js";
import deleteButton from "./utils/deleteProduct.js";
import createMenu from "./ui/createMenu.js";
import { displayMenu, hideMenu } from "./ui/hamburgerMenu.js";
import logoutButton from "./ui/logoutButton.js";
import { getToken } from "./utils/storage.js";

const token = getToken();

if (!token) {
    location.href = "/index.html";
}

createMenu();
logoutButton();

const bars = document.querySelector(".fa-bars");
const close = document.querySelector(".close-container");

bars.addEventListener("click", displayMenu);
close.addEventListener("click", hideMenu);

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

if (!id) {
    document.location.href = "/index.html";
}

const productUrl = baseUrl + "products/" + id;

const form = document.querySelector("form");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const imageUrl = document.querySelector("#image_url");
const imageAltText = document.querySelector("#image_alt_text");
const featured = document.querySelector("#featured");
const idInput = document.querySelector("#id");
const message = document.querySelector(".message-container");
const loading = document.querySelector(".loader");

(async function () {
    try {
        const response = await fetch(productUrl);
        const details = await response.json();

        title.value = details.title;
        price.value = details.price;
        description.value = details.description;
        imageUrl.value = details.image_url;
        imageAltText.value = details.image_alt_text;
        featured.value = details.featured;
        idInput.value = details.id;

        deleteButton(details.id);

        if (details.featured) {
            featured.checked = true;
        }
    } catch (error) {
        displayMessage("error", "Something went wrong", ".message-container");
    } finally {
        loading.style.display = "none";
        form.style.display = "block";
    }
})();

form.addEventListener("submit", submitForm);

function submitForm(event) {
    event.preventDefault();

    message.innerHTML = "";

    const titleValue = title.value.trim();
    const priceValue = parseFloat(price.value);
    const descriptionValue = description.value.trim();
    const imageUrlValue = imageUrl.value.trim();
    const imageAltTextValue = imageAltText.value.trim();
    const featuredValue = featured.checked;
    const idValue = idInput.value;

    if (
        titleValue.length === 0 ||
        priceValue.length === 0 ||
        isNaN(priceValue) ||
        descriptionValue.length === 0 ||
        imageUrlValue.length === 0 ||
        imageAltTextValue.length === 0
    ) {
        return displayMessage("warning", "Please supply proper values", ".message-container");
    }

    updateProduct(titleValue, priceValue, descriptionValue, imageUrlValue, imageAltTextValue, featuredValue, idValue);
}
