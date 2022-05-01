import { baseUrl } from "./settings/api.js";
import { renderProducts } from "./ui/renderProducts.js";
import { searchProducts } from "./ui/searchProducts.js";
import { displayMessage } from "./ui/displayMessage.js";

const productsUrl = baseUrl + "products";

(async function () {
    try {
        const response = await fetch(productsUrl);
        const products = await response.json();

        renderProducts(products);
        searchProducts(products);
    } catch (error) {
        console.log(error);
    }
})();
