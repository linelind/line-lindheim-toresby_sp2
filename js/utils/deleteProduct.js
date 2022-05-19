import { baseUrl } from "../settings/api.js";
import { getToken } from "./storage.js";
import { displayMessage } from "../ui/displayMessage.js";

export default function deleteButton(id) {
    const deleteContainer = document.querySelector(".delete-container");

    deleteContainer.innerHTML = `<button type="button" class="delete-btn">Delete</button>`;

    const deleteBtn = document.querySelector(".delete-btn");

    deleteBtn.onclick = async function () {
        const doDelete = confirm("Are you sure you want to delete this product?");

        if (doDelete) {
            const url = baseUrl + "products/" + id;

            const token = getToken();

            const options = {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            try {
                const response = await fetch(url, options);
                const json = await response.json();

                location.href = "/admin.html";
            } catch (error) {
                displayMessage("error", "An error occured", ".message-container");
            }
        }
    };
}
