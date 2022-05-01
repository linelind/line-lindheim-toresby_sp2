export function renderProducts(productsToRender) {
    const prodContainer = document.querySelector(".shop--products-container");

    prodContainer.innerHTML = "";

    productsToRender.forEach(function (product) {
        prodContainer.innerHTML += `<a class="productcard" href="details.html?id=${product.id}">
                                            <div class="productcard-imagecontainer">
                                                <img src="http://localhost:1337${product.image.url}" alt="${product.image.alternativeText}" />
                                            </div>
                                            <div class="productcard-textcontainer">
                                                <h3>${product.title}</h3>
                                                <p>£${product.price}</p>
                                                <button class="cta-view">View</button>
                                            </div>
                                        </a>`;
    });
}
