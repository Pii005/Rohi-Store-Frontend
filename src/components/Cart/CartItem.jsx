import "./CartItem.css";

export default function CartItem({ producto }) {
    return (
        <div className="cart-item">

            <div className="cart-item-info">
                <h4>{producto.nombre}</h4>
                <p>
                    Cantidad: {producto.cantidad}
                </p>
            </div>

            <span className="cart-item-price">
                ${producto.precio * producto.cantidad}
            </span>

        </div>
    );
}