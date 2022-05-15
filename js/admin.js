import { baseUrl } from "./settings/api.js";
import { addProduct } from "./utils/addProduct.js";
import { displayMessage } from "./ui/displayMessage.js";
import createMenu from "./ui/createMenu.js";

const logoutBtn = document.querySelector(".btn-logout");
const menuContainerSmall = document.querySelector(".uppernav-smallscreen");
const menuContainerLarge = document.querySelector(".navuser-container");

createMenu();

logoutBtn.onclick = function () {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    menuContainerSmall.innerHTML = `<a href="login.html" class="login-menu-small">Log in</a>
                                    <a href="cart.html"><i class="fa-solid fa-cart-shopping"></i></a>`;

    menuContainerLarge.innerHTML = `<a href="login.html" class="login-menu-large btn-login">Log in</a>
                                    <a href="cart.html"><i class="fa-solid fa-cart-shopping"></i></a>`;

    location.href = "login.html";
};

const form = document.querySelector("form");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const imageUrl = document.querySelector("#image_url");
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
    const featuredValue = featured.checked;

    if (titleValue.length === 0 || priceValue.length === 0 || isNaN(priceValue) || descriptionValue.length === 0 || imageUrlValue.length === 0) {
        return displayMessage("warning", "Please add values", ".message-container");
    }

    addProduct(titleValue, priceValue, descriptionValue, imageUrlValue, featuredValue);
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
                                                    <img src="http://localhost:1337${product.image.url}" alt="${product.image.alternativeText}" />
                                                </div>
                                                <div class="productcard-textcontainer">
                                                    <h3>${product.title}</h3>
                                                    <p>£${product.price}</p>
                                                    <button class="cta-edit">Edit</button>
                                                </div>
                                            </a>`;
        });
    } catch (error) {
        displayMessage("error", "Something went wrong while fetching the products", ".shop--products-container");
    }
})();
