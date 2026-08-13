import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../services/authService";
import "./Sidebar.css";

export default function Sidebar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <div className="sidebar-content">

            <ul>
                <li>
                    <Link to="/productos?categoria=amigurumis">
                        Amigurumis
                    </Link>
                </li>

                <li>
                    <Link to="/productos?categoria=llaveros">
                        Llaveros
                    </Link>
                </li>

                <li>
                    <Link to="/productos?categoria=accesorios">
                        Accesorios
                    </Link>
                </li>

                <li>
                    <Link to="/productos?categoria=flores">
                        Ramos
                    </Link>
                </li>

                <li>
                    <Link to="/productos?categoria=personalizados">
                        Personalizados
                    </Link>
                </li>
            </ul>

            <button
                className="sidebar-logout"
                onClick={handleLogout}
            >
                Cerrar sesión
            </button>

        </div>
    );
}