import { baseUrl } from "../settings/api.js";
import { getToken } from "./storage.js";
import { displayMessage } from "../ui/displayMessage.js";

export async function addProduct(title, price, description, imageUrl, featured) {
    const url = baseUrl + "products";

    const data = JSON.stringify({
        title: title,
        price: price,
        description: description,
        image_url: imageUrl,
        featured: featured,
    });

    const token = getToken();

    const options = {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    const form = document.querySelector("form");

    try {
        const response = await fetch(url, options);
        const json = await response.json();

        if (json.created_at) {
            displayMessage("success", "Product has been added", ".message-container");
            form.reset();
        }

        if (json.error) {
            displayMessage("error", "An error occured", ".message-container");
        }
    } catch (error) {
        displayMessage("error", "An error occured", ".message-container");
    }
}
