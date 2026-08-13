import { useState } from "react";
import "./CrearProducto.css";
import { createProduct } from "../../../services/api";

export default function CrearProducto() {
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [stock, setStock] = useState("");
    const [categoria, setCategoria] = useState("");
    const [imagen, setImagen] = useState(null);
    const [error, setError] = useState("");

    const validarFormulario = () => {
        const soloLetras = /^[a-zA-ZÀ-ÿñÑ\s]+$/;

        if (!soloLetras.test(nombre.trim())) {
            return "El nombre no puede contener números ni símbolos";
        }

        if (Number(precio) < 1) {
            return "El precio debe ser al menos 1";
        }

        if (Number(stock) < 1) {
            return "El stock debe ser al menos 1";
        }

        return "";
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        const errorValidacion = validarFormulario();

        if (errorValidacion) {
            setError(errorValidacion);
            return;
        }

        try {
            const producto = await createProduct({
                nombre,
                precio,
                descripcion,
                stock,
                categoria,
                imagen,
            });

            console.log("Producto creado:", producto);

            setNombre("");
            setPrecio("");
            setDescripcion("");
            setStock("");
            setCategoria("");
            setImagen(null);

            document.getElementById("imagen").value = "";

        } catch (err) {
            console.error("Error creando producto:", err);
            setError(err.message);
        }
    };

    return (
        <section className="crear-producto-card">

            <div className="crear-producto-header">
                <h1>Agregar producto</h1>
                <p>Administrá los productos de Rohi</p>
            </div>

            <form onSubmit={handleSubmit}>

                <div className="form-group">
                    <label htmlFor="nombre">
                        Nombre
                    </label>

                    <input
                        id="nombre"
                        type="text"
                        placeholder="Ingresá el nombre del producto"
                        value={nombre}
                        onChange={(event) => setNombre(event.target.value)}
                        required
                    />
                </div>

                <div className="form-row">

                    <div className="form-group">
                        <label htmlFor="precio">
                            Precio
                        </label>

                        <input
                            id="precio"
                            type="number"
                            min="1"
                            placeholder="4000"
                            value={precio}
                            onChange={(event) => setPrecio(event.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="stock">
                            Stock
                        </label>

                        <input
                            id="stock"
                            type="number"
                            min="1"
                            placeholder="10"
                            value={stock}
                            onChange={(event) => setStock(event.target.value)}
                            required
                        />
                    </div>

                </div>

                <div className="form-group">
                    <label htmlFor="categoria">
                        Categoría
                    </label>

                    <select
                        id="categoria"
                        value={categoria}
                        onChange={(event) => setCategoria(event.target.value)}
                        required
                    >
                        <option value="">
                            Seleccioná una categoría
                        </option>

                        <option value="amigurumis">
                            Amigurumis
                        </option>

                        <option value="accesorios">
                            Accesorios
                        </option>

                        <option value="flores">
                            Flores
                        </option>

                        <option value="llaveros">
                            Llaveros
                        </option>

                        <option value="personalizados">
                            Personalizados
                        </option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="descripcion">
                        Descripción
                    </label>

                    <textarea
                        id="descripcion"
                        placeholder="Ingresá una descripción del producto"
                        value={descripcion}
                        onChange={(event) => setDescripcion(event.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="imagen">
                        Imagen
                    </label>

                    <input
                        id="imagen"
                        type="file"
                        accept="image/*"
                        onChange={(event) => setImagen(event.target.files[0])}
                        required
                    />
                </div>

                {error && (
                    <p className="crear-producto-error">{error}</p>
                )}

                <button
                    type="submit"
                    className="crear-producto-button"
                >
                    Agregar producto
                </button>

            </form>

        </section>
    );
}