import { baseUrl } from "./settings/api.js";

const homeUrl = baseUrl + "home";

(async function () {
    try {
        const response = await fetch(homeUrl);
        const json = await response.json();

        const herobanner = document.querySelector(".hero-banner");

        herobanner.style.backgroundImage = `url("http://localhost:1337${json.hero_banner.url}")`;
    } catch (error) {
        console.log(error);
    }
})();
