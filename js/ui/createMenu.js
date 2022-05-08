import { getUsername } from "../utils/storage.js";

export default function createMenu() {
    const loginBtnSmall = document.querySelector(".login-menu-small");
    const loginBtnLarge = document.querySelector(".login-menu-large");
    const username = getUsername();

    if (username) {
        loginBtnSmall.innerHTML = `<span>Log out</span>`;
        loginBtnLarge.innerHTML = `<span>Log out</span>`;
    }
}
