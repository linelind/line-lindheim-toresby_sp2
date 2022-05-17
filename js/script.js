import { baseUrl } from "./settings/api.js";
import { renderProducts } from "./ui/renderProducts.js";
import { searchProducts } from "./ui/searchProducts.js";
import { displayMessage } from "./ui/displayMessage.js";
import createMenu from "./ui/createMenu.js";
import { displayMenu, hideMenu } from "./ui/hamburgerMenu.js";

const productsUrl = baseUrl + "products";

createMenu();

const bars = document.querySelector(".fa-bars");
const close = document.querySelector(".close-container");

bars.addEventListener("click", displayMenu);
close.addEventListener("click", hideMenu);

(async function () {
    try {
        const response = await fetch(productsUrl);
        const products = await response.json();

        renderProducts(products);
        searchProducts(products);
    } catch (error) {
        displayMessage("error", "Something went wrong when fetching the products", ".shop--products-container");
    }
})();
