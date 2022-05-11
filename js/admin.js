import { baseUrl } from "./settings/api.js";
import createMenu from "./ui/createMenu.js";

const logoutBtn = document.querySelector(".btn-logout");
const menuContainerSmall = document.querySelector(".uppernav-smallscreen");
const menuContainerLarge = document.querySelector(".navuser-container");

createMenu();

logoutBtn.onclick = function () {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    menuContainerSmall.innerHTML = `<a href="login.html" class="login-menu-small">Log in</a>
                                    <a href="cart.html"><i class="fa-solid fa-cart-shopping"></i></a>`;

    menuContainerLarge.innerHTML = `<a href="login.html" class="login-menu-large btn-login">Log in</a>
                                    <a href="cart.html"><i class="fa-solid fa-cart-shopping"></i></a>`;
};
