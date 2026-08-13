import { Link } from "react-router-dom";
import "./CompraExitosa.css";

export default function CompraExitosa() {
    return (
        <div className="success-page">
            <div className="success-card">
                <div className="success-icon">✓</div>
                <h1>¡Compra realizada con éxito!</h1>
                <p>Tu pedido fue confirmado y ya lo estamos preparando.</p>

                <div className="success-actions">
                    <Link to="/" className="success-button">
                        Volver al inicio
                    </Link>
                </div>
            </div>
        </div>
    );
}