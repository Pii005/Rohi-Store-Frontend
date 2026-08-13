import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Registro from "../pages/register/register";
import Admin from "../pages/Admin/Admin";
import ProductoDetalle from "../pages/Productdetails/productDetails";
import CrearProducto from "../pages/Admin/crearProducto/CrearProducto";
import Carrito from "../pages/Carrito/cart";
import CompraExitosa from "../pages/CompraExitosa/CompraExitosa";
import Productos from "../pages/Productos/Productos";

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registro />} />
            <Route path="/admin" element={<Admin />} />
            <Route
                path="/producto/:id"
                element={<ProductoDetalle />}
            />
            <Route
                path="/admin/crear-producto"
                element={<CrearProducto />}
            />
            <Route path="/productos" element={<Productos />} />
            <Route path="/compra-exitosa" element={<CompraExitosa />} />
            <Route path="/cart" element={<Carrito />} />            
            <Route
                path="*"
                element={<h1>RUTA NO ENCONTRADA</h1>}
            />
        </Routes>
        
    );
}

