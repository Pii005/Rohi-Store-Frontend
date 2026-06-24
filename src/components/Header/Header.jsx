import { useState } from "react";
import './Header.css'
import { IoMenu } from "react-icons/io5";
import Sidebar from "../Sidebar/Sidebar";
import { TbShoppingCart } from "react-icons/tb";
import { LuUserRound } from "react-icons/lu";
import { BiSearchAlt } from "react-icons/bi";// src\assets\icons\logoRohi.png

export default function HeaderHome() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
        <header>
            <div className="header-left">
                <button
                    className="menu-button"
                    onClick={toggleMenu}
                >
                    <IoMenu className="IoMenu" />
                </button>

                <img
                    src="../src/assets/icons/logoRohiBlack.png"
                    className="logoRohiBlack"
                    alt="Logo"
                />

                <div className="Options-Header">
                    <h5>Amigurumis</h5>
                    <h5>Llaveros</h5>
                    <h5>Accesorios</h5>
                    <h5>Ramos</h5>
                    <h5>Personalizados</h5>
                </div>
            </div>

            <div className="header-right">
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Buscar..."
                        className="search-input"
                    />
                    <BiSearchAlt className="search-icon" />
                </div>

                <LuUserRound className="header-icon" />
                <TbShoppingCart className="header-icon" />
            </div>
        </header>

        {isMenuOpen && (
            <div className={isMenuOpen ? "sidebar-open" : "sidebar-close"}>
                <Sidebar />
            </div>
        )}
        </>

    );

};

