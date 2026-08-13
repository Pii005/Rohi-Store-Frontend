import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {

    return (
        <footer className="footer">

            <div className="footer-container">

                {/* LOGO Y DESCRIPCIÓN */}

                <div className="footer-brand">

                    <Link to="/" className="footer-logo-link">

                        <img
                            src="../src/assets/icons/logoRohiBlack.png"
                            className="footer-logo"
                            alt="Logo Rohi"
                        />

                    </Link>

                    <p>
                        Productos tejidos a mano con mucho amor.
                    </p>

                </div>


                {/* NAVEGACIÓN */}

                <div className="footer-links">

                    <h3>
                        Navegación
                    </h3>

                    <Link to="/">
                        Inicio
                    </Link>

                    <Link to="/productos">
                        Productos
                    </Link>

                    <Link to="/carrito">
                        Carrito
                    </Link>

                    <Link to="/login">
                        Mi cuenta
                    </Link>

                </div>


                {/* CATEGORÍAS */}

                <div className="footer-links">

                    <h3>
                        Categorías
                    </h3>

                    <Link to="/productos?categoria=amigurumis">
                        Amigurumis
                    </Link>

                    <Link to="/productos?categoria=llaveros">
                        Llaveros
                    </Link>

                    <Link to="/productos?categoria=accesorios">
                        Accesorios
                    </Link>

                    <Link to="/productos?categoria=flores">
                        Flores
                    </Link>

                    <Link to="/productos?categoria=personalizados">
                        Personalizados
                    </Link>

                </div>

            </div>


            {/* COPYRIGHT */}

            <div className="footer-bottom">

                <p>
                    © {new Date().getFullYear()} Rohi. Todos los derechos reservados.
                </p>

            </div>

        </footer>
    );
}