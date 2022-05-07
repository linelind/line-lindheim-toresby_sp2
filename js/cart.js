import { getExistingItem } from "./utils/cartFunctions.js";

const addedItems = getExistingItem();

const cartContainer = document.querySelector(".cart-container");
const cartTotal = document.querySelector(".cart-totalsum");

if (addedItems.length === 0) {
    cartContainer.innerHTML = "No items in cart.";
    cartTotal.innerHTML = totalSum;
}

addedItems.forEach((cartItem) => {
    cartContainer.innerHTML += `<div class="cart-item">
                                    <div class="cart-item--imagecontainer">
                                        <img src="${cartItem.image}" alt="Product image.">
                                    </div>
                                    <div class="cart-item--titlecontainer">
                                        <h2>${cartItem.title}</h2>
                                        <a href="details.html?id=${cartItem.id}">Go to product</a>
                                    </div>
                                    <div class="cart-item--pricecontainer">
                                        <p>£${cartItem.price}</p>
                                    </div>
                                    <div class="cart-item--trashcontainer">
                                        <i class="fa-solid fa-trash-can"></i>
                                    </div>
                                </div>`;

    let totalSum = 0;

    for (var i = 0; i < addedItems.length; i++) {
        totalSum += JSON.parse(addedItems[i].price);
    }

    cartTotal.innerHTML = "£" + totalSum;
    console.log(totalSum);
});
