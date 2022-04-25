import { baseUrl } from "./settings/api.js";

const productsUrl = baseUrl + "products";

(async function () {
    try {
        const response = await fetch(productsUrl);
        const json = await response.json();

        const featuredContainer = document.querySelector(".featured--products");

        featuredContainer.innerHTML = "";

        json.forEach(function (product) {
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
        console.log(error);
    }
})();
