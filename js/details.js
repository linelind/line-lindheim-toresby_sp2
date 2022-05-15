import { baseUrl } from "./settings/api.js";
import { getExistingItem, saveCartItem } from "./utils/cartFunctions.js";
import { displayMessage } from "./ui/displayMessage.js";
import createMenu from "./ui/createMenu.js";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const urlDetails = baseUrl + "products/" + id;

createMenu();

(async function () {
    try {
        const result = await fetch(urlDetails);
        const details = await result.json();

        createHtml(details);
    } catch (error) {
        displayMessage("error", "Something went wrong", ".message-detailscontainer");
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
                                            <button class="cta cta-add" data-id="${product.id}" data-title="${product.title}" data-price="${product.price}" data-image="http://localhost:1337${product.image.url}">Add to cart</button>
                                            <p>${product.description}</p>
                                        </div>
                                    </div>`;

    const pageTitle = document.querySelector("title");

    pageTitle.innerHTML = `The Flowerpot | ${product.title}`;

    const addButton = document.querySelector(".cta-add");

    addButton.addEventListener("mouseup", addToCart);

    function addToCart() {
        const id = this.dataset.id;
        const title = this.dataset.title;
        const price = this.dataset.price;
        const image = this.dataset.image;

        addButton.style.backgroundColor = "#302c2b";
        addButton.innerHTML = "Item added";

        setTimeout(function () {
            addButton.style.backgroundColor = "#5f7762";
            addButton.innerHTML = "Add to cart";
        }, 1000);

        const currentCartItems = getExistingItem();

        const item = { id: id, title: title, price: price, image: image };
        currentCartItems.push(item);
        saveCartItem(currentCartItems);
    }
}
