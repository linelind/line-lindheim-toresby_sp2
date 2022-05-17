import { baseUrl } from "./settings/api.js";
import { renderProducts } from "./ui/renderProducts.js";
import { searchProducts } from "./ui/searchProducts.js";
import { displayMessage } from "./ui/displayMessage.js";
import createMenu from "./ui/createMenu.js";

const productsUrl = baseUrl + "products";

createMenu();

(async function () {
    try {
        const response = await fetch(productsUrl);
        const products = await response.json();

        renderProducts(products);
        searchProducts(products);
    } catch (error) {
        displayMessage("error", "Something went wrong while fetching the products", ".shop--products-container");
        console.log(error);
    }
})();
