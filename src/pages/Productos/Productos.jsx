import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import HeaderHome from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Cards from "../../components/Cards/Cards";

import { getProductsFiltered } from "../../services/api";

import "./Productos.css";


export default function Productos() {

    const [searchParams] = useSearchParams();

    const [productos, setProductos] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    /*
        FILTROS
    */

    const nombre = searchParams.get("nombre") || "";

    const categoria = searchParams.get("categoria") || "";


    /*
        CARGAR PRODUCTOS
    */

    useEffect(() => {

        const fetchProductos = async () => {

            setLoading(true);

            setError("");


            try {

                const data = await getProductsFiltered({
                    nombre,
                    categoria,
                });

                setProductos(data);

            } catch (err) {

                setError(
                    err.message || "Error al cargar los productos."
                );

            } finally {

                setLoading(false);

            }

        };


        fetchProductos();

    }, [nombre, categoria]);


    /*
        TÍTULO
    */

    const titulo = nombre
        ? `Resultados para "${nombre}"`
        : categoria
            ? categoria.charAt(0).toUpperCase() + categoria.slice(1)
            : "Todos los productos";


    return (

        <div className="productos-page">

            {/* HEADER */}

            <HeaderHome />


            {/* CONTENIDO */}

            <main className="productos-main">

                <h1 className="productos-titulo">
                    {titulo}
                </h1>


                {/* LOADING */}

                {loading && (

                    <p className="productos-estado">
                        Cargando productos...
                    </p>

                )}


                {/* ERROR */}

                {error && (

                    <p className="productos-estado productos-error">
                        {error}
                    </p>

                )}


                {/* SIN PRODUCTOS */}

                {!loading &&
                    !error &&
                    productos.length === 0 && (

                        <p className="productos-estado">
                            No se encontraron productos.
                        </p>

                    )}


                {/* PRODUCTOS */}

                {!loading &&
                    !error &&
                    productos.length > 0 && (

                        <div className="productos-grid">

                            {productos.map((producto) => (

                                <Cards
                                    key={producto._id}
                                    id={producto._id}
                                    nombre={producto.nombre}
                                    precio={producto.precio}
                                    imagen={producto.imagen}
                                />

                            ))}

                        </div>

                    )}

            </main>


            {/* FOOTER */}

            <Footer />

        </div>

    );
}