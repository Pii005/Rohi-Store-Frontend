import { createSlice } from "@reduxjs/toolkit";
import { getCart, saveCart } from "../../services/cartService";

const initialState = {
    items: getCart(),
};

const cartSlice = createSlice({

    name: "carrito",

    initialState,

    reducers: {

        agregarProducto: (state, action) => {

            const producto = action.payload;

            const existente = state.items.find(
                (item) => item._id === producto._id
            );

            if (existente) {

                existente.cantidad += producto.cantidad;

            } else {

                state.items.push(producto);

            }

            saveCart(state.items);
        },


        disminuirCantidad: (state, action) => {

            const id = action.payload;

            const producto = state.items.find(
                (item) => item._id === id
            );

            if (!producto) {
                return;
            }

            if (producto.cantidad > 1) {

                producto.cantidad -= 1;

            } else {

                state.items = state.items.filter(
                    (item) => item._id !== id
                );

            }

            saveCart(state.items);
        },


        eliminarProducto: (state, action) => {

            const id = action.payload;

            state.items = state.items.filter(
                (item) => item._id !== id
            );

            saveCart(state.items);
        },


        vaciarCarrito: (state) => {

            state.items = [];

            saveCart(state.items);
        },

    },
});

export const {
    agregarProducto,
    disminuirCantidad,
    eliminarProducto,
    vaciarCarrito,
} = cartSlice.actions;

export default cartSlice.reducer;