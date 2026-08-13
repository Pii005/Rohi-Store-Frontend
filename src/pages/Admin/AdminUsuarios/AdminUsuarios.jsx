import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../../../services/api";
import { getCurrentUser } from "../../../services/authService";
import "./AdminUsuarios.css";

export default function AdminUsuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const usuarioActual = getCurrentUser();

    const cargarUsuarios = async () => {
        setLoading(true);
        setError("");

        try {
            const data = await getUsers();
            setUsuarios(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarUsuarios();
    }, []);

    const handleEliminar = async (id, nombre) => {
        if (id === usuarioActual?.id) {
            alert("No podés eliminar tu propia cuenta.");
            return;
        }

        const confirmar = window.confirm(`¿Eliminar a "${nombre}"? Esta acción no se puede deshacer.`);
        if (!confirmar) return;

        try {
            await deleteUser(id);
            cargarUsuarios();
        } catch (err) {
            alert(err.message);
        }
    };

    if (loading) return <p className="admin-usuarios-estado">Cargando usuarios...</p>;
    if (error) return <p className="admin-usuarios-estado admin-usuarios-error">{error}</p>;

    return (
        <div className="admin-usuarios">
            <h1>Usuarios</h1>

            {usuarios.length === 0 ? (
                <p className="admin-usuarios-estado">No hay usuarios registrados.</p>
            ) : (
                <div className="admin-usuarios-tabla-wrapper">
                    <table className="admin-usuarios-tabla">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Rol</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map((usuario) => (
                                <tr key={usuario._id}>
                                    <td>{usuario.nombre}</td>
                                    <td>{usuario.email}</td>
                                    <td>
                                        <span className={`admin-usuario-rol ${usuario.role}`}>
                                            {usuario.role}
                                        </span>
                                    </td>
                                    <td>
                                        <button
                                            className="admin-usuario-eliminar"
                                            onClick={() => handleEliminar(usuario._id, usuario.nombre)}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}