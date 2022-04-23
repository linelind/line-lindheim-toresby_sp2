import { baseUrl } from "./settings/api.js";

const productsUrl = baseUrl + "products";

(async function () {
    const prodContainer = document.querySelector(".products-container");

    try {
        const response = await fetch(productsUrl);
        const json = await response.json();

        console.log(json);

        prodContainer.innerHTML = "";

        json.forEach(function (product) {
            prodContainer.innerHTML += `<a class="productcard" href="productspecific.html?id=${product.id}">
                                            <img src=http://localhost:1337${product.image.url} alt="${product.image.alternativeText}" />
                                            <h3>${product.title}</h3>
                                            <p>${product.price}</p>
                                        </a>`;
        });
    } catch (error) {
        console.log(error);
    }
})();
