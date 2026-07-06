import HeaderHome from "../../components/Header/Header";
import Hero from "../../components/HeroSection/Hero";
import './Home.css'

import Cards from "../../components/Cards/Cards";

// PRUEBA
const productosFavoritos = [
  { id: 1, nombre: "Osito amigurumi", precio: "4.500", imagen: "../../assets/hero.png" },
  { id: 2, nombre: "Bolso floral",    precio: "8.200", imagen: "/imgs/bolso.png" },
  { id: 3, nombre: "Vincha tejida",   precio: "2.800", imagen: "/imgs/vincha.png" },
];

export default function Home() {
  return (
    <section className="home">
      <HeaderHome />
      <div className="home-hero-wrapper">
        <Hero />
      </div>

      <div className="home-section">
        <h2 className="home-section-title">Productos favoritos</h2>
        <div className="home-grid">
          {productosFavoritos.map((p) => (
            <Cards
              key={p.id}
              nombre={p.nombre}
              precio={p.precio}
              imagen={p.imagen}
            />
          ))}
        </div>
      </div>

    </section>
  );
}