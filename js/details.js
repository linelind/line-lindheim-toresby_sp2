import { baseUrl } from "./settings/api.js";
import { getExistingItem, saveCartItem } from "./utils/cartFunctions.js";
import { displayMessage } from "./ui/displayMessage.js";
import createMenu from "./ui/createMenu.js";
import { displayMenu, hideMenu } from "./ui/hamburgerMenu.js";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const urlDetails = baseUrl + "products/" + id;

createMenu();

const bars = document.querySelector(".fa-bars");
const close = document.querySelector(".close-container");

bars.addEventListener("click", displayMenu);
close.addEventListener("click", hideMenu);

(async function () {
    try {
        const result = await fetch(urlDetails);
        const details = await result.json();

        createHtml(details);
    } catch (error) {
        const detailsContainer = document.querySelector(".details-container");
        detailsContainer.innerHTML = "";
        displayMessage("error", "Something went wrong", ".message-container");
    }
})();

function createHtml(product) {
    const detailsContainer = document.querySelector(".details-container");

    detailsContainer.innerHTML = "";

    detailsContainer.innerHTML += `<div class="details-container">
                                        <div class="details--imagecontainer">
                                        <img src="${product.image_url}" alt="Product image of ${product.title}." />
                                        </div>
                                        <div class="details--textcontainer">
                                            <h1>${product.title}</h1>
                                            <p>£${product.price}</p>
                                            <button class="cta details-button" data-id="${product.id}" data-title="${product.title}" data-price="${product.price}" data-image="${product.image_url}" data-imagetext="${product.image_alt_text}">Add to cart</button>
                                            <p>${product.description}</p>
                                        </div>
                                    </div>`;

    const detailsBtn = document.querySelector(".details-button");
    const currentCartItems = getExistingItem();

    const productExists = currentCartItems.find(function (cartitem) {
        return cartitem.id === id;
    });

    if (!productExists) {
        detailsBtn.innerHTML = "Add to cart";
    } else {
        detailsBtn.innerHTML = "Remove from cart";
        detailsBtn.style.backgroundColor = "#302c2b";
    }

    const pageTitle = document.querySelector("title");

    pageTitle.innerHTML = `The Flowerpot | ${product.title}`;

    detailsBtn.addEventListener("mouseup", addToCart);
}

function addToCart() {
    const detailsBtn = document.querySelector(".details-button");

    if (detailsBtn.innerHTML === "Add to cart") {
        detailsBtn.innerHTML = "Remove from cart";
        detailsBtn.style.backgroundColor = "#302c2b";
    } else {
        detailsBtn.innerHTML = "Add to cart";
        detailsBtn.style.backgroundColor = "#5f7762";
    }

    const id = this.dataset.id;
    const title = this.dataset.title;
    const price = this.dataset.price;
    const image = this.dataset.image;
    const imagetext = this.dataset.imagetext;

    const currentCartItems = getExistingItem();

    const productExists = currentCartItems.find(function (cartitem) {
        return cartitem.id === id;
    });

    if (productExists === undefined) {
        const item = { id: id, title: title, price: price, image: image, imagetext: imagetext };
        currentCartItems.push(item);
        saveCartItem(currentCartItems);
    } else {
        const newItem = currentCartItems.filter((cartitem) => cartitem.id !== id);
        saveCartItem(newItem);
    }
}
