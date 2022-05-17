export default function logoutButton() {
    const logoutBtn = document.querySelector(".btn-logout");
    const menuContainerSmall = document.querySelector(".uppernav-smallscreen");
    const menuContainerLarge = document.querySelector(".navuser-container");

    logoutBtn.onclick = function () {
        const doLogout = confirm("Are your sure you want to log out?");

        if (doLogout) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");

            location.href = "/index.html";

            menuContainerSmall.innerHTML = `<a href="login.html" class="login-menu-small">Log in</a>
                                            <a href="cart.html"><i class="fa-solid fa-cart-shopping"></i></a>`;

            menuContainerLarge.innerHTML = `<a href="login.html" class="login-menu-large btn-login">Log in</a>
                                            <a href="cart.html"><i class="fa-solid fa-cart-shopping"></i></a>`;
        }
    };
}
