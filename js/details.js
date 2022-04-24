import { baseUrl } from "./settings/api.js";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const urlDetails = baseUrl + "products/" + id;

console.log(urlDetails);

(async function () {
    try {
        const result = await fetch(urlDetails);
        const details = await result.json();

        console.log(details);

        createHtml(details);
    } catch (error) {
        console.log(error);
    }
})();

function createHtml(product) {
    const detailsContainer = document.querySelector(".details-container");

    detailsContainer.innerHTML = "";

    detailsContainer.innerHTML += `<div class="details-container">
                                        <div class="details--imagecontainer">
                                            <img src="http://localhost:1337${product.image.url}" alt="${product.image.alternativeText}"/>
                                        </div>
                                        <div class="details--textcontainer">
                                            <h1>${product.title}</h1>
                                            <p>£${product.price}</p>
                                            <button class="cta">Add to cart</button>
                                            <p>${product.description}</p>
                                        </div>
                                    </div>`;
}
