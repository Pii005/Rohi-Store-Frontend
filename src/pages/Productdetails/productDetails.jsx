import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import HeaderHome from "../../components/Header/Header";
import { getProductById } from "../../services/api";
import { agregarProducto } from "../../redux/slices/cartSlice";

import "./productDetails.css";

export default function ProductoDetalle() {

    const { id } = useParams();

    const dispatch = useDispatch();

    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);

    const [cantidad, setCantidad] = useState(1);

    useEffect(() => {

        const loadProduct = async () => {

            try {

                const data = await getProductById(id);

                console.log("Producto:", data);

                setProducto(data);

            } catch (error) {

                console.error(
                    "Error cargando producto:",
                    error
                );

            } finally {

                setLoading(false);

            }

        };

        loadProduct();

    }, [id]);


    const aumentarCantidad = () => {

        if (cantidad < producto.stock) {
            setCantidad(cantidad + 1);
        }

    };


    const disminuirCantidad = () => {

        if (cantidad > 1) {
            setCantidad(cantidad - 1);
        }

    };


    const handleAgregarCarrito = () => {

        const productoCarrito = {
            ...producto,
            cantidad: cantidad,
        };

        dispatch(agregarProducto(productoCarrito));

        setCantidad(1);

    };


    if (loading) {

        return (
            <>
                <HeaderHome />

                <p>Cargando producto...</p>
            </>
        );

    }


    if (!producto) {

        return (
            <>
                <HeaderHome />

                <p>Producto no encontrado.</p>
            </>
        );

    }


    return (
        <div className="producto-detalle-page">

            <HeaderHome />

            <main className="producto-detalle-container">

                <div className="producto-detalle-image">

                    <img
                        src={producto.imagen}
                        alt={producto.nombre}
                    />

                </div>


                <div className="producto-detalle-info">

                    <h1>
                        {producto.nombre}
                    </h1>


                    <p className="producto-descripcion">
                        {producto.descripcion}
                    </p>


                    <p className="producto-categoria">
                        Categoría: {producto.categoria}
                    </p>


                    <p className="producto-stock">
                        Stock disponible: {producto.stock}
                    </p>


                    <p className="producto-precio">
                        ${producto.precio.toLocaleString("es-AR")}
                    </p>


                    <div className="cantidad-container">

                        <span>Cantidad:</span>

                        <div className="cantidad-controls">

                            <button
                                onClick={disminuirCantidad}
                            >
                                -
                            </button>

                            <span>
                                {cantidad}
                            </span>

                            <button
                                onClick={aumentarCantidad}
                            >
                                +
                            </button>

                        </div>

                    </div>


                    <button
                        className="agregar-carrito-button"
                        onClick={handleAgregarCarrito}
                    >
                        Agregar al carrito
                    </button>

                </div>

            </main>

        </div>
    );
}