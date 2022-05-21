import { getExistingItem } from "./utils/cartFunctions.js";
import createMenu from "./ui/createMenu.js";
import { displayMenu, hideMenu } from "./ui/hamburgerMenu.js";

const addedItems = getExistingItem();

const cartContainer = document.querySelector(".cart-container");
const cartTotal = document.querySelector(".cart-totalsum");

createMenu();

const bars = document.querySelector(".fa-bars");
const close = document.querySelector(".close-container");

bars.addEventListener("click", displayMenu);
close.addEventListener("click", hideMenu);

cartContainer.innerHTML = "";

if (addedItems.length === 0) {
    cartContainer.innerHTML = "No items in cart.";
    cartContainer.style.padding = "50px";
    cartContainer.style.backgroundColor = "#f8e3dc";
    cartTotal.innerHTML = "£0";
}

addedItems.forEach((cartItem) => {
    cartContainer.innerHTML += `<div class="cart-item" id="${cartItem.id}"> 
                                        <div class="cart-item--imagecontainer">
                                            <img src="${cartItem.image}" alt="${cartItem.imagetext}" />
                                        </div>                                        
                                        <div class="cart-item_textcontainer">
                                            <div class="cart-item--titlecontainer">
                                                <h2>${cartItem.title}</h2>
                                                <a href="details.html?id=${cartItem.id}">Go to product</a>
                                            </div>
                                            <div class="cart-item--pricecontainer">
                                                <p>£${cartItem.price}</p>
                                            </div> 
                                        </div>
                                    </div>`;

    let totalSum = 0;

    for (var i = 0; i < addedItems.length; i++) {
        totalSum += JSON.parse(addedItems[i].price);
    }

    cartTotal.innerHTML = "£" + totalSum.toFixed(2);
});
