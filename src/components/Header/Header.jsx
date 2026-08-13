import { useState } from "react";
import "./Header.css";

import { IoMenu } from "react-icons/io5";
import Sidebar from "../Sidebar/Sidebar";
import { TbShoppingCart } from "react-icons/tb";
import { LuUserRound } from "react-icons/lu";
import { BiSearchAlt } from "react-icons/bi";
import { MdAdminPanelSettings } from "react-icons/md";

import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../services/authService";

import { useSelector } from "react-redux";
import MiniCart from "../Cart/MiniCart";

export default function HeaderHome() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [busqueda, setBusqueda] = useState("");

    const navigate = useNavigate();
    const items = useSelector((state) => state.cart.items);

    const session = getCurrentUser();
    const esAdmin = session?.role === "admin";

    const cantidadProductos = items.reduce(
        (total, item) => total + item.cantidad,
        0
    );

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleBuscar = (event) => {
        event.preventDefault();

        if (busqueda.trim() === "") return;

        navigate(`/productos?nombre=${encodeURIComponent(busqueda.trim())}`);
        setBusqueda("");
    };

    return (
        <>
            <header>

                {/* IZQUIERDA */}

                <div className="header-left">

                    <button
                        className="menu-button"
                        onClick={toggleMenu}
                    >
                        <IoMenu className="menu-icon" />
                    </button>

                    <Link to="/" className="logo-link">

                        <img
                            src="../src/assets/icons/logoRohiBlack.png"
                            className="logoRohiBlack"
                            alt="Logo Rohi"
                        />

                    </Link>

                    <nav className="Options-Header">

                        <Link to="/productos?categoria=amigurumis">
                            <h5>Amigurumis</h5>
                        </Link>

                        <Link to="/productos?categoria=llaveros">
                            <h5>Llaveros</h5>
                        </Link>

                        <Link to="/productos?categoria=accesorios">
                            <h5>Accesorios</h5>
                        </Link>

                        <Link to="/productos?categoria=flores">
                            <h5>Flores</h5>
                        </Link>

                        <Link to="/productos?categoria=personalizados">
                            <h5>Personalizados</h5>
                        </Link>

                    </nav>

                </div>


                {/* DERECHA */}

                <div className="header-right">

                    {/* BUSCADOR */}

                    <form className="search-bar" onSubmit={handleBuscar}>

                        <input
                            type="text"
                            placeholder="Buscar..."
                            className="search-input"
                            value={busqueda}
                            onChange={(event) => setBusqueda(event.target.value)}
                        />

                        <button type="submit" className="search-icon-button">
                            <BiSearchAlt className="search-icon" />
                        </button>

                    </form>


                    {/* USUARIO */}

                    {!session && (

                        <Link
                            to="/login"
                            className="header-user"
                        >
                            <LuUserRound className="header-icon" />
                        </Link>

                    )}


                    {/* CARRITO */}

                    <div className="cart-container">

                        <button
                            className="cart-button"
                            onClick={() =>
                                setIsCartOpen(!isCartOpen)
                            }
                            aria-label="Abrir carrito"
                        >

                            <TbShoppingCart className="cart-icon" />

                            {cantidadProductos > 0 && (

                                <span className="cart-count">
                                    {cantidadProductos}
                                </span>

                            )}

                        </button>


                        {isCartOpen && (
                            <MiniCart />
                        )}

                    </div>


                    {/* ADMIN */}

                    {esAdmin && (

                        <Link
                            to="/admin"
                            className="header-admin"
                            title="Panel de administración"
                        >

                            <MdAdminPanelSettings className="header-icon" />

                        </Link>

                    )}

                </div>

            </header>


            {/* SIDEBAR */}

            {isMenuOpen && (

                <div className="sidebar-open">

                    <Sidebar />

                </div>

            )}

        </>
    );
}