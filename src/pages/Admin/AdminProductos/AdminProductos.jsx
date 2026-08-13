import { useEffect, useState } from "react";
import { getProductsFiltered, updateProduct, deleteProduct } from "../../../services/api";
import "./AdminProductos.css";

export default function AdminProductos() {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [editandoId, setEditandoId] = useState(null);
    const [form, setForm] = useState({});

    const cargarProductos = async () => {
        setLoading(true);
        setError("");

        try {
            const data = await getProductsFiltered({});
            setProductos(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarProductos();
    }, []);

    const iniciarEdicion = (producto) => {
        setEditandoId(producto._id);
        setForm({
            nombre: producto.nombre,
            precio: producto.precio,
            stock: producto.stock,
            categoria: producto.categoria,
            descripcion: producto.descripcion,
        });
    };

    const cancelarEdicion = () => {
        setEditandoId(null);
        setForm({});
    };

    const guardarEdicion = async (id) => {
        try {
            await updateProduct(id, form);
            setEditandoId(null);
            cargarProductos();
        } catch (err) {
            alert(err.message);
        }
    };

    const handleEliminar = async (id, nombre) => {
        const confirmar = window.confirm(`¿Eliminar "${nombre}"? Esta acción no se puede deshacer.`);
        if (!confirmar) return;

        try {
            await deleteProduct(id);
            cargarProductos();
        } catch (err) {
            alert(err.message);
        }
    };

    if (loading) return <p className="admin-productos-estado">Cargando productos...</p>;
    if (error) return <p className="admin-productos-estado admin-productos-error">{error}</p>;

    return (
        <div className="admin-productos">
            <h1>Productos</h1>

            {productos.length === 0 ? (
                <p className="admin-productos-estado">No hay productos cargados.</p>
            ) : (
                <div className="admin-productos-lista">
                    {productos.map((producto) => (
                        <div className="admin-producto-card" key={producto._id}>

                            {editandoId === producto._id ? (

                                <div className="admin-producto-edit">

                                    <input
                                        type="text"
                                        value={form.nombre}
                                        onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                                        placeholder="Nombre"
                                    />

                                    <input
                                        type="number"
                                        value={form.precio}
                                        onChange={(e) => setForm({ ...form, precio: e.target.value })}
                                        placeholder="Precio"
                                    />

                                    <input
                                        type="number"
                                        value={form.stock}
                                        onChange={(e) => setForm({ ...form, stock: e.target.value })}
                                        placeholder="Stock"
                                    />

                                    <select
                                        value={form.categoria}
                                        onChange={(e) => setForm({ ...form, categoria: e.target.value })}
                                    >
                                        <option value="amigurumis">Amigurumis</option>
                                        <option value="accesorios">Accesorios</option>
                                        <option value="flores">Flores</option>
                                        <option value="llaveros">Llaveros</option>
                                        <option value="personalizados">Personalizados</option>
                                    </select>

                                    <textarea
                                        value={form.descripcion}
                                        onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                                        placeholder="Descripción"
                                    />

                                    <div className="admin-producto-edit-actions">
                                        <button
                                            className="admin-producto-guardar"
                                            onClick={() => guardarEdicion(producto._id)}
                                        >
                                            Guardar
                                        </button>

                                        <button
                                            className="admin-producto-cancelar"
                                            onClick={cancelarEdicion}
                                        >
                                            Cancelar
                                        </button>
                                    </div>

                                </div>

                            ) : (

                                <>
                                    <img
                                        src={producto.imagen}
                                        alt={producto.nombre}
                                        className="admin-producto-img"
                                    />

                                    <div className="admin-producto-info">
                                        <h3>{producto.nombre}</h3>
                                        <p>${producto.precio.toLocaleString("es-AR")} — Stock: {producto.stock}</p>
                                        <p className="admin-producto-categoria">{producto.categoria}</p>
                                    </div>

                                    <div className="admin-producto-actions">
                                        <button onClick={() => iniciarEdicion(producto)}>
                                            Editar
                                        </button>

                                        <button
                                            className="admin-producto-eliminar"
                                            onClick={() => handleEliminar(producto._id, producto.nombre)}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </>

                            )}

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}