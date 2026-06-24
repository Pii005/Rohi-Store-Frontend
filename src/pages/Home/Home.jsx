import HeaderHome from "../../components/Header/Header";
import Hero from "../../components/HeroSection/Hero";
import './Home.css'

export default function Home() {
    return (
        <>
        <section className="home">
            <HeaderHome />
            <Hero />
        </section>
        </>
    )
}