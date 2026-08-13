import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import HeaderHome from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import {
    agregarProducto,
    eliminarProducto,
    disminuirCantidad,
    vaciarCarrito,
} from "../../redux/slices/cartSlice";

import { getCurrentUser } from "../../services/authService";
import { createOrder } from "../../services/orderService";

import "./Cart.css";

export default function Cart() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const items = useSelector((state) => state.cart.items);
    const usuario = getCurrentUser();

    const [procesando, setProcesando] = useState(false);
    const [errorPago, setErrorPago] = useState("");

    /*
        REDIRECCIÓN SI NO ESTÁ LOGUEADO
    */

    useEffect(() => {
        if (!usuario) {
            navigate("/login");
        }
    }, [usuario, navigate]);


    /*
        TOTAL DEL CARRITO
    */

    const total = items.reduce(
        (acc, item) =>
            acc + item.precio * item.cantidad,
        0
    );


    /*
        CANTIDAD TOTAL DE PRODUCTOS
    */

    const cantidadTotal = items.reduce(
        (acc, item) =>
            acc + item.cantidad,
        0
    );


    /*
        AUMENTAR CANTIDAD
    */

    const aumentarCantidad = (producto) => {
        if (producto.cantidad < producto.stock) {
            dispatch(
                agregarProducto({
                    ...producto,
                    cantidad: 1,
                })
            );
        }
    };


    /*
        DISMINUIR CANTIDAD
    */

    const reducirCantidad = (producto) => {
        dispatch(
            disminuirCantidad(producto._id)
        );
    };


    /*
        REALIZAR COMPRA
    */

    const handlePagar = async () => {
        setErrorPago("");
        setProcesando(true);

        try {
            await createOrder(items);

            dispatch(vaciarCarrito());

            navigate("/compra-exitosa");

        } catch (error) {
            setErrorPago(error.message);

        } finally {
            setProcesando(false);
        }
    };


    /*
        SI NO HAY USUARIO
    */

    if (!usuario) {
        return null;
    }


    return (
        <div className="cart-page">

            <HeaderHome />


            <main className="cart-main">

                <h1 className="cart-title">
                    Mi carrito
                </h1>


                {items.length === 0 ? (

                    /*
                        CARRITO VACÍO
                    */

                    <div className="cart-empty">

                        <h2>
                            Tu carrito está vacío
                        </h2>

                        <button
                            type="button"
                            onClick={() => navigate("/")}
                        >
                            Ver productos
                        </button>

                    </div>

                ) : (

                    /*
                        CARRITO CON PRODUCTOS
                    */

                    <div className="cart-content">


                        {/* =========================
                            PRODUCTOS
                        ========================= */}

                        <section className="cart-products">

                            <h2>
                                Productos
                            </h2>


                            {items.map((producto) => (

                                <div
                                    className="cart-item"
                                    key={producto._id}
                                >

                                    {/* IMAGEN */}

                                    <img
                                        className="cart-item-img"
                                        src={producto.imagen}
                                        alt={producto.nombre}
                                    />


                                    {/* INFORMACIÓN */}

                                    <div className="cart-item-body">

                                        <h3 className="cart-item-name">
                                            {producto.nombre}
                                        </h3>


                                        <p className="cart-item-price">
                                            $
                                            {producto.precio.toLocaleString(
                                                "es-AR"
                                            )}
                                        </p>


                                        <div className="cart-item-controls">


                                            {/* CANTIDAD */}

                                            <div className="cart-quantity">

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        reducirCantidad(
                                                            producto
                                                        )
                                                    }
                                                >
                                                    -
                                                </button>

                                                <span>
                                                    {producto.cantidad}
                                                </span>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        aumentarCantidad(
                                                            producto
                                                        )
                                                    }
                                                >
                                                    +
                                                </button>

                                            </div>


                                            {/* ELIMINAR */}

                                            <button
                                                type="button"
                                                className="cart-delete"
                                                onClick={() =>
                                                    dispatch(
                                                        eliminarProducto(
                                                            producto._id
                                                        )
                                                    )
                                                }
                                            >
                                                Eliminar
                                            </button>

                                        </div>

                                    </div>


                                    {/* TOTAL DEL PRODUCTO */}

                                    <div className="cart-item-total">

                                        $
                                        {(
                                            producto.precio *
                                            producto.cantidad
                                        ).toLocaleString("es-AR")}

                                    </div>

                                </div>

                            ))}

                        </section>


                        {/* =========================
                            RESUMEN
                        ========================= */}

                        <aside className="cart-summary">

                            <h2>
                                Resumen
                            </h2>


                            <div className="cart-summary-row">

                                <span>
                                    Productos
                                </span>

                                <span>
                                    {cantidadTotal}
                                </span>

                            </div>


                            <div className="cart-summary-total">

                                <span>
                                    Total
                                </span>

                                <strong>
                                    ${total.toLocaleString("es-AR")}
                                </strong>

                            </div>


                            {/* ERROR DE PAGO */}

                            {errorPago && (

                                <p className="cart-error">
                                    {errorPago}
                                </p>

                            )}


                            {/* BOTÓN PAGAR */}

                            <button
                                type="button"
                                className="cart-pay-button"
                                onClick={handlePagar}
                                disabled={procesando}
                            >
                                {procesando
                                    ? "Procesando..."
                                    : "Pagar"
                                }
                            </button>

                        </aside>

                    </div>

                )}

            </main>


            {/* FOOTER */}

            <Footer />

        </div>
    );
}