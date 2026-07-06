import HeaderHome from "../../components/Header/Header";
import Hero from "../../components/HeroSection/Hero";
// import CardCarousel from "../../components/CardCarousel/CardCarousel";
import CardCarousel from "../../components/CardCarousel/CardCarousel";
import './Home.css';

const productosFavoritos = [
  { id: 1, nombre: "Osito amigurumi", precio: "4.500", imagen: "/imgs/osito.png" },
  { id: 2, nombre: "Bolso floral",    precio: "8.200", imagen: "/imgs/bolso.png" },
  { id: 3, nombre: "Vincha tejida",   precio: "2.800", imagen: "/imgs/vincha.png" },
  { id: 4, nombre: "Ramo crochet",    precio: "6.500", imagen: "/imgs/ramo.png" },
  { id: 5, nombre: "Ranita verde",    precio: "3.900", imagen: "/imgs/rana.png" },
  { id: 6, nombre: "Conejito rosa",   precio: "4.200", imagen: "/imgs/conejo.png" },
];

const amigurumis = [
  { id: 7,  nombre: "Osito polar",   precio: "4.800", imagen: "/imgs/polar.png" },
  { id: 8,  nombre: "Patito bebé",   precio: "3.500", imagen: "/imgs/pato.png" },
  { id: 9,  nombre: "Gatito gris",   precio: "4.100", imagen: "/imgs/gato.png" },
  { id: 10, nombre: "Perrito café",  precio: "4.300", imagen: "/imgs/perro.png" },
];

export default function Home() {
  return (
    <section className="home">
      <HeaderHome />
      <div className="home-hero-wrapper">
        <Hero />
      </div>

      <CardCarousel titulo="Productos favoritos" productos={productosFavoritos} />
      <CardCarousel titulo="Amigurumis" productos={amigurumis} />
    </section>
  );
}