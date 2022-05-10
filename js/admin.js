import { baseUrl } from "./settings/api.js";
import { displayMessage } from "./ui/displayMessage.js";
import createMenu from "./ui/createMenu.js";

const logoutBtn = document.querySelector(".btn-logout");

createMenu();

logoutBtn.onclick = function () {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};
