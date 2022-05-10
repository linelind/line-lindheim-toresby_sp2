import { getUsername } from "../utils/storage.js";

export default function createMenu() {
    const menuContainerSmall = document.querySelector(".uppernav-smallscreen");
    const menuContainerLarge = document.querySelector(".navuser-container");
    const username = getUsername();

    if (username) {
        menuContainerSmall.innerHTML = `<a href="admin.html" class="login-menu-small">Hi ${username}</a>
                                        <a href="cart.html"><i class="fa-solid fa-cart-shopping"></i></a>`;

        menuContainerLarge.innerHTML = `<a href="admin.html" class="login-menu-large btn-login">Hi ${username}</a>
                                        <a href="cart.html"><i class="fa-solid fa-cart-shopping"></i></a>`;
    }
}
