import { getExistingItem } from "./utils/cartFunctions.js";

const addedItems = getExistingItem();

const cartContainer = document.querySelector(".cart-container");

addedItems.forEach((cartItem) => {
    cartContainer.innerHTML += `<div class="cartItem">
                                <h2>${cartItem.title}</h2>
                                </div>`;
});
