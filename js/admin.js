import { baseUrl } from "./settings/api.js";
import { addProduct } from "./utils/addProduct.js";
import { displayMessage } from "./ui/displayMessage.js";
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

const form = document.querySelector("form");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const imageUrl = document.querySelector("#image_url");
const imageAltText = document.querySelector("#image_alt_text");
const featured = document.querySelector("#featured");
const message = document.querySelector(".message-container");

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

    if (
        titleValue.length === 0 ||
        priceValue.length === 0 ||
        isNaN(priceValue) ||
        descriptionValue.length === 0 ||
        imageUrlValue.length === 0 ||
        imageAltTextValue.length === 0
    ) {
        return displayMessage("warning", "Please add values", ".message-container");
    }

    addProduct(titleValue, priceValue, descriptionValue, imageUrlValue, imageAltTextValue, featuredValue);
}

const productsUrl = baseUrl + "products";

createMenu();

(async function () {
    try {
        const response = await fetch(productsUrl);
        const products = await response.json();

        const editContainer = document.querySelector(".editproducts-content");

        editContainer.innerHTML = "";

        products.forEach(function (product) {
            editContainer.innerHTML += `<a class="productcard" href="edit.html?id=${product.id}">
                                                <div class="productcard-imagecontainer">
                                                <img src="${product.image_url}" alt="${product.image_alt_text}" />
                                                </div>
                                                <div class="productcard-textcontainer">
                                                    <h3>${product.title}</h3>
                                                    <p>£${product.price}</p>
                                                    <button class="cta-edit">Edit</button>
                                                </div>
                                            </a>`;
        });
    } catch (error) {
        displayMessage("error", "Something went wrong while fetching the products", ".editproducts-content");
    }
})();
