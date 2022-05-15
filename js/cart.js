import { getExistingItem, saveCartItem } from "./utils/cartFunctions.js";
import createMenu from "./ui/createMenu.js";

const addedItems = getExistingItem();

const cartContainer = document.querySelector(".cart-container");
const cartTotal = document.querySelector(".cart-totalsum");

createMenu();

if (addedItems.length === 0) {
    cartContainer.innerHTML = "No items in cart.";
    cartTotal.innerHTML = totalSum;
}

addedItems.forEach((cartItem) => {
    /* const productID = document.getElementById(`${cartItem.id}`);*/
    /* if (!productID) { */

    cartContainer.innerHTML += `<div class="cart-item" id="${cartItem.id}">
                                        <div class="cart-item--imagecontainer">
                                            <img src="${cartItem.image}" alt="Product image.">
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
    /* } */

    let totalSum = 0;

    for (var i = 0; i < addedItems.length; i++) {
        totalSum += JSON.parse(addedItems[i].price);
    }

    cartTotal.innerHTML = "£" + totalSum.toFixed(0);

    /* const trash = document.querySelectorAll(".fa-trash-can");

    trash.forEach((button) => {
        button.addEventListener("click", handleClick);
    });

    function handleClick() {
        console.log("hi");

        if (trash.id === cartItem.id) {
            localStorage.remove(cartItem);
        }

    } */
});
