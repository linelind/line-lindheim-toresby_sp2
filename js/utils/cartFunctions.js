export function getExistingItem() {
    const cartItems = localStorage.getItem("cartitems");

    if (!cartItems) {
        return [];
    } else {
        return JSON.parse(cartItems);
    }
}

export function saveCartItem(cartItems) {
    localStorage.setItem("cartitems", JSON.stringify(cartItems));
}
