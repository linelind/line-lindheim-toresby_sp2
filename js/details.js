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
    let cssClass = "cta-add";

    detailsContainer.innerHTML = "";

    detailsContainer.innerHTML += `<div class="details-container">
                                        <div class="details--imagecontainer">
                                            <img src="http://localhost:1337${product.image.url}" alt="${product.image.alternativeText}"/>
                                        </div>
                                        <div class="details--textcontainer">
                                            <h1>${product.title}</h1>
                                            <p>£${product.price}</p>
                                            <button class="cta ${cssClass}" data-id="${product.id}" data-title="${product.title}" data-price="${product.price}" data-image="http://localhost:1337${product.image.url}">Add to cart</button>
                                            <p>${product.description}</p>
                                        </div>
                                    </div>`;

    const pageTitle = document.querySelector("title");

    pageTitle.innerHTML = `The Flowerpot | ${product.title}`;

    const addButton = document.querySelector(".cta-add");
    addButton.addEventListener("mouseup", addToCart);
}

function addToCart() {
    this.classList.toggle("cta-add");
    this.classList.toggle("cta-remove");

    const id = this.dataset.id;
    const title = this.dataset.title;
    const price = this.dataset.price;
    const image = this.dataset.image;

    const currentCartItems = getExistingItem();

    const productExists = currentCartItems.find(function (cartitem) {
        return cartitem.id === id;
    });

    if (productExists === undefined) {
        const item = { id: id, title: title, price: price, image: image };
        currentCartItems.push(item);
        saveCartItem(currentCartItems);
    } else {
        const newItem = currentCartItems.filter((cartitem) => cartitem.id !== id);
        saveCartItem(newItem);
    }
}
