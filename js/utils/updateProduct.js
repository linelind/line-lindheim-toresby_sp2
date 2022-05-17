import { baseUrl } from "../settings/api.js";
import { getToken } from "./storage.js";
import { displayMessage } from "../ui/displayMessage.js";

export async function updateProduct(title, price, description, imageUrl, imageAlt, featured, id) {
    const url = baseUrl + "products/" + id;

    const data = JSON.stringify({
        title: title,
        price: price,
        description: description,
        image_url: imageUrl,
        alternativeText: imageAlt,
        featured: featured,
    });

    const token = getToken();

    const options = {
        method: "PUT",
        body: data,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();

        if (json.updated_at) {
            displayMessage("success", "Product updated", ".message-container");
        }

        if (json.error) {
            displayMessage("error", "An error occured", ".message-container");
        }
    } catch (error) {
        displayMessage("error", "An error occured", ".message-container");
        console.log(error);
    }
}
