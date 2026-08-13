import { getToken } from "./authService";

const ORDERS_API_URL = "http://localhost:3000/api/orders";

export async function createOrder(items) {
    const itemsFormateados = items.map((item) => ({
        productoId: item._id,
        cantidad: item.cantidad,
    }));

    const response = await fetch(ORDERS_API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ items: itemsFormateados }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.mensaje || "Error al crear la orden");
    }

    return data;
}

export async function getMisOrdenes() {
    const response = await fetch(`${ORDERS_API_URL}/mis-ordenes`, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.mensaje || "Error al obtener las órdenes");
    }

    return data;
}