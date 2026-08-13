const CART_KEY = "rohi_carrito";

export function saveCart(items) {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function getCart() {
    const cart = localStorage.getItem(CART_KEY);

    if (!cart) {
        return [];
    }

    return JSON.parse(cart);
}

export function clearCart() {
    localStorage.removeItem(CART_KEY);
}