import { baseUrl } from "./settings/api.js";
import { displayMessage } from "./ui/displayMessage.js";
import { displayMenu, hideMenu } from "./ui/hamburgerMenu.js";
import createMenu from "./ui/createMenu.js";

const homeUrl = baseUrl + "home";
const productsUrl = baseUrl + "products";

createMenu();

const bars = document.querySelector(".fa-bars");
const close = document.querySelector(".close-container");

bars.addEventListener("click", displayMenu);
close.addEventListener("click", hideMenu);

(async function () {
    try {
        const response = await fetch(homeUrl);
        const json = await response.json();

        const herobanner = document.querySelector(".hero-banner");

        herobanner.style.backgroundImage = `url("http://localhost:1337${json.hero_banner.url}")`;

        const featuredProducts = await fetch(productsUrl);
        const result = await featuredProducts.json();

        const featureProducts = document.querySelector(".featured--products");

        featureProducts.innerHTML = "";

        result.forEach(function (product) {
            if (product.featured === true) {
                featureProducts.innerHTML += `<a class="featuredcard" href="details.html?id=${product.id}">
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
        const featuredContainer = document.querySelector(".featured-container");
        featuredContainer.innerHTML = "";

        displayMessage("error", "Something went wrong when loading the page", ".message-container");
    }
})();
