import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import HeaderHome from "../../components/Header/Header";
import Cards from "../../components/Cards/Cards";
import { getProductsFiltered } from "../../services/api";
import "./Productos.css";

export default function Productos() {
    const [searchParams] = useSearchParams();
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const nombre = searchParams.get("nombre") || "";
    const categoria = searchParams.get("categoria") || "";

    useEffect(() => {
        const fetchProductos = async () => {
            setLoading(true);
            setError("");

            try {
                const data = await getProductsFiltered({ nombre, categoria });
                setProductos(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProductos();
    }, [nombre, categoria]);

    const titulo = nombre
        ? `Resultados para "${nombre}"`
        : categoria
        ? categoria.charAt(0).toUpperCase() + categoria.slice(1)
        : "Todos los productos";

    return (
        <div className="productos-page">
            <HeaderHome />

            <main className="productos-main">
                <h1 className="productos-titulo">{titulo}</h1>

                {loading && (
                    <p className="productos-estado">Cargando productos...</p>
                )}

                {error && (
                    <p className="productos-estado productos-error">{error}</p>
                )}

                {!loading && !error && productos.length === 0 && (
                    <p className="productos-estado">
                        No se encontraron productos.
                    </p>
                )}

                {!loading && !error && productos.length > 0 && (
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
        </div>
    );
}