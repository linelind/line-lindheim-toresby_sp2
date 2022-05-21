export function renderProducts(productsToRender) {
    const prodContainer = document.querySelector(".shop--products-container");

    prodContainer.innerHTML = "";

    productsToRender.forEach(function (product) {
        prodContainer.innerHTML += `<a class="productcard" href="details.html?id=${product.id}">
                                            <div class="productcard-imagecontainer">
                                            <img src="${product.image_url}" alt="${product.image_alt_text}" />
                                            </div>
                                            <div class="productcard-textcontainer">
                                                <h3>${product.title}</h3>
                                                <p>£${product.price}</p>
                                                <button class="cta-view">View</button>
                                            </div>
                                        </a>`;
    });
}
