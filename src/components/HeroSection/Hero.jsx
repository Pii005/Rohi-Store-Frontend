import "./Hero.css";

export default function Hero(){
    return (
        <section className="hero">
            <h1 className="hero-title">
                Rohi Store
            </h1>

            <p className="hero-subtitle">
                Crochet hecho a mano con amor
            </p>

            <div className="hero-icons">

                <div className="hero-circle">
                    🌸
                </div>

                <div className="hero-circle">
                    🧸
                </div>

                <div className="hero-circle">
                    🎀
                </div>


            </div>
        </section>
    );
}