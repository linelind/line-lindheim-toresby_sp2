import { baseUrl } from "../settings/api.js";
import { getToken } from "./storage.js";

export default function deleteButton(id) {
    const deleteContainer = document.querySelector(".delete-container");

    deleteContainer.innerHTML = `<button type="button" class="delete-btn">Delete</button>`;

    const deleteBtn = document.querySelector(".delete-btn");

    deleteBtn.onclick = async function () {
        console.log(id);

        const doDelete = confirm("Are you sure you want to delete this product?");

        console.log(doDelete);

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
                console.log(json);
            } catch (error) {
                console.log(error);
            }
        }
    };
}
