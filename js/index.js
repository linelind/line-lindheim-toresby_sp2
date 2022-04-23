import { baseUrl } from "./settings/api.js";

const homeUrl = baseUrl + "home";

(async function () {
    const herobanner = document.querySelector(".hero-banner");

    try {
        const response = await fetch(homeUrl);
        const json = await response.json();

        console.log(json);

        /* herobanner.innerHTML = ""; */

        herobanner.style.backgroundImage = `url("http://localhost:1337${json.hero_banner.url}")`;
    } catch (error) {
        console.log(error);
    }
})();
