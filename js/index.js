import { baseUrl } from "./settings/api.js";
import { displayMessage } from "./ui/displayMessage.js";
import createMenu from "./ui/createMenu.js";

const homeUrl = baseUrl + "home";
const productsUrl = baseUrl + "products";

createMenu();

(async function () {
    try {
        const response = await fetch(homeUrl);
        const json = await response.json();

        const herobanner = document.querySelector(".hero-banner");

        herobanner.style.backgroundImage = `url("http://localhost:1337${json.hero_banner.url}")`;

        const featuredProducts = await fetch(productsUrl);
        const result = await featuredProducts.json();

        const featuredContainer = document.querySelector(".featured--products");

        featuredContainer.innerHTML = "";

        result.forEach(function (product) {
            if (product.featured === true) {
                featuredContainer.innerHTML += `<a class="featuredcard" href="details.html?id=${product.id}">
                                                    <div class="featuredcard-imagecontainer">
                                                        <img src="http://localhost:1337${product.image.url}" alt="${product.image.alternativeText}" />
                                                        <div class="featured-decoration"></div>
                                                    </div>
                                                    <div class="featuredcard-textcontainer">
                                                        <h3>${product.title}</h3>
                                                        <p>£${product.price}</p>
                                                    </div>                                                   
                                                </a>`;
            }
        });
    } catch (error) {
        displayMessage("error", "Something went wrong when loading the page", ".message-homecontainer");
    }
})();
