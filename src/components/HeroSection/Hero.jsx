import "./Hero.css";
import IconoFlorHome from "../../assets/icons/IconoFlorHome.png";
import Iconoboladelana from "../../assets/icons/Iconoboladelana.png";
import Iconoaguja from "../../assets/icons/Iconoaguja.png";
import Iconotijera from "../../assets/icons/Iconotijera.png";

export default function Hero() {
  return (
    <section className="hero">

      <div className="hero-left">
        <img src={IconoFlorHome} alt="flor decorativa" className="hero-flower" />
        <div className="hero-text">
          <h1 className="hero-title">
            Hechos con amor,<br />Tejidos a mano
          </h1>
          <button className="hero-btn">Ver todo</button>
        </div>
      </div>

      <div className="hero-icons">
        <div className="hero-circle">
          <img src={Iconoboladelana} alt="lana" />
        </div>
        <div className="hero-circle hero-circle--up">
          <img src={Iconoaguja} alt="gancho" />
        </div>
        <div className="hero-circle">
          <img src={Iconotijera} alt="tijera" />
        </div>
      </div>

    </section>
  );
}