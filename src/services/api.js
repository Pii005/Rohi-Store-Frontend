const API_URL = "http://localhost:3000/api/users";
import { getToken } from "./authService";

export async function loginUser(email, password) {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Error al iniciar sesión");
    }

    return data;
}

export async function registerUser(nombre, email, password) {
    const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nombre,
            email,
            password,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Error al crear la cuenta");
    }

    return data;
}


const PRODUCTS_API_URL = "http://localhost:3000/api/products";

export async function getProducts() {
    const response = await fetch(PRODUCTS_API_URL);

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Error al obtener los productos");
    }

    return data;
}

export async function getProductsByCategory(categoria) {
    const response = await fetch(
        `${PRODUCTS_API_URL}?categoria=${categoria}`
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Error al obtener los productos por categoría"
        );
    }

    return data;
}

export async function createProduct(product) {
    const formData = new FormData();

    formData.append("nombre", product.nombre);
    formData.append("precio", product.precio);
    formData.append("descripcion", product.descripcion);
    formData.append("stock", product.stock);
    formData.append("categoria", product.categoria);
    formData.append("imagen", product.imagen);

    const response = await fetch(PRODUCTS_API_URL, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
        body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || data.mensaje || "Error al crear el producto"
        );
    }

    return data;
}

export async function getProductById(id) {
    const response = await fetch(`${PRODUCTS_API_URL}/${id}`);

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            data.mensaje ||
            "Error al obtener el producto"
        );
    }

    return data;
}

export async function getProductsFiltered(params = {}) {
    const query = new URLSearchParams();

    if (params.nombre) query.append("nombre", params.nombre);
    if (params.categoria) query.append("categoria", params.categoria);
    if (params.precioMin) query.append("precioMin", params.precioMin);
    if (params.precioMax) query.append("precioMax", params.precioMax);
    if (params.orden) query.append("orden", params.orden);

    const response = await fetch(`${PRODUCTS_API_URL}?${query.toString()}`);

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.mensaje || "Error al obtener los productos");
    }

    return data;
}

export async function updateProduct(id, product) {
    const response = await fetch(`${PRODUCTS_API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(product),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.mensaje || "Error al actualizar el producto");
    }

    return data;
}

export async function deleteProduct(id) {
    const response = await fetch(`${PRODUCTS_API_URL}/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.mensaje || "Error al eliminar el producto");
    }

    return data;
}


const USERS_API_URL = "http://localhost:3000/api/users";

export async function getUsers() {
    const response = await fetch(USERS_API_URL, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.mensaje || "Error al obtener los usuarios");
    }

    return data;
}

export async function deleteUser(id) {
    const response = await fetch(`${USERS_API_URL}/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.mensaje || "Error al eliminar el usuario");
    }

    return data;
}