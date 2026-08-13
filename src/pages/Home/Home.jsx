import { useEffect, useState } from "react";
import HeaderHome from "../../components/Header/Header";
import Hero from "../../components/HeroSection/Hero";
import CardCarousel from "../../components/CardCarousel/CardCarousel";
import CustomOrderBanner from "../../components/CustomOrderBanner/CustomOrderBanner";
import { getProductsByCategory } from "../../services/api";
import "./Home.css";

export default function Home() {
    const [amigurumis, setAmigurumis] = useState([]);
    const [accesorios, setAccesorios] = useState([]);
    const [flores, setFlores] = useState([]);
    const [llaveros, setLlaveros] = useState([]);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const [
                    amigurumisData,
                    accesoriosData,
                    floresData,
                    llaverosData,
                ] = await Promise.all([
                    getProductsByCategory("amigurumis"),
                    getProductsByCategory("accesorios"),
                    getProductsByCategory("flores"),
                    getProductsByCategory("llaveros"),
                ]);

                setAmigurumis(amigurumisData);
                setAccesorios(accesoriosData);
                setFlores(floresData);
                setLlaveros(llaverosData);

            } catch (error) {
                console.error("Error cargando productos:", error);
            }
        };

        loadProducts();
    }, []);

    return (
        <section className="home">
            <HeaderHome />

            <div className="home-hero-wrapper">
                <Hero />
            </div>

            <CardCarousel
                titulo="Amigurumis"
                productos={amigurumis}
            />

            <CardCarousel
                titulo="Accesorios"
                productos={accesorios}
            />

            <CustomOrderBanner />

            <CardCarousel
                titulo="Flores"
                productos={flores}
            />

            <CardCarousel
                titulo="Llaveros"
                productos={llaveros}
            />
        </section>
    );
}