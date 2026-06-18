import { useState } from "react";
import './Header.css'
import { IoMenu } from "react-icons/io5";
import Sidebar from "../Sidebar/Sidebar";
import { TbShoppingCart, LuUserRound , BiSearchAlt  } from "react-icons/tb";
// src\assets\icons\logoRohi.png

function HeaderHome() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const toggleMenu = () => {
        // console.log("Cambiando a " + ismenuOpen);
        setIsMenuOpen(!isMenuOpen);
       
        // console.log("Paso a " + (isMenuOpen ? "Abierto" : "Cerrado"));
    };

    // function Himenu() {
    //     // console.log("Himenu toggle esta - " + (isMenuOpen ? "Abierto" : "Cerrado"));
    //     toggleMenu();
    //     if(isMenuOpen) {
    //         console.log("Abriendo menu");
    //         return <Sidebar />;
    //     }
    // }

    
    return (
        <>
        <header>
            <div className="header-left">
                {/* Menu y Logo */}
                {/* <button className="menu-button" onClick={() => toggleMenu()} ><IoMenu className="IoMenu" /></button> */}
                <img  src="../src/assets/icons/logoRohiBlack.png" className="logoRohiBlack" alt="Logo"  />
                {/* <h1>{isMenuOpen ? "ABIERTO" : "CERRADO"}</h1>      */}
                <div className="Options-Header">
                    <h5>Amigurumis</h5>
                    <h5>Llaveros</h5>
                    <h5>Accesorios</h5>
                    <h5>Ramos</h5>
                    <h5>Personalizados</h5>

                </div>

            </div>
            <div className="header-right">
                {/* Buscador, perfil/login/registro y carrito */}
                <div className="Options-Header">
                    <h5><BiSearchAlt /></h5>
                    <h5><LuUserRound /></h5>
                    <h5><TbShoppingCart /></h5>
                </div>
            </div>
        </header>
       
        </>

    );

};

export default HeaderHome;