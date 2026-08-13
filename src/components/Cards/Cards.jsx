import "./Cards.css";
import { Link } from "react-router-dom";

export default function Cards({ id, imagen, nombre, precio }) {
    return (
        <Link
            to={`/producto/${id}`}
            className="card"
        >
            <div className="card-img-wrapper">
                <img
                    src={imagen}
                    alt={nombre}
                    className="card-img"
                />
            </div> 

            <div className="card-info">
                <p className="card-precio">
                    ${precio.toLocaleString("es-AR")}
                </p>

                <p className="card-nombre">
                    {nombre}
                </p>
            </div>
        </Link>
    );
}