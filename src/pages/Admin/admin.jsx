import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderHome from "../../components/Header/Header";
import { logout } from "../../services/authService";
import CrearProducto from "./crearProducto/CrearProducto";
import AdminProductos from "./adminProductos/AdminProductos";
import AdminUsuarios from "./adminUsuarios/AdminUsuarios";
import "./Admin.css";

export default function Admin() {
    const [seccion, setSeccion] = useState("usuarios");
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <div className="admin-page">

            <HeaderHome />

            <div className="admin-layout">

                <aside className="admin-sidebar">

                    <div className="admin-sidebar-header">
                        <h2>Administración</h2>
                    </div>

                    <nav className="admin-nav">

                        <button
                            className={seccion === "usuarios" ? "active" : ""}
                            onClick={() => setSeccion("usuarios")}
                        >
                            Usuarios
                        </button>

                        <button
                            className={seccion === "productos" ? "active" : ""}
                            onClick={() => setSeccion("productos")}
                        >
                            Productos
                        </button>

                        <button
                            className={seccion === "crear-producto" ? "active" : ""}
                            onClick={() => setSeccion("crear-producto")}
                        >
                            Crear producto
                        </button>

                    </nav>

                    <div className="admin-sidebar-bottom">

                        <button
                            className="admin-logout"
                            onClick={handleLogout}
                        >
                            Cerrar sesión
                        </button>

                    </div>

                </aside>


                <main className="admin-content">

                    {seccion === "usuarios" && <AdminUsuarios />}

                    {seccion === "productos" && <AdminProductos />}

                    {seccion === "crear-producto" && <CrearProducto />}

                </main>

            </div>

        </div>
    );
}