import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import CartItem from "./CartItem";
import "./MiniCart.css";

export default function MiniCart() {

    const navigate = useNavigate();

    const items = useSelector((state) => state.cart.items);

    const total = items.reduce(
        (acc, item) => acc + item.precio * item.cantidad,
        0
    );

    return (
        <div className="mini-cart">

            <h3>Mi carrito</h3>

            <div className="mini-cart-products">

                {items.length === 0 ? (
                    <p className="empty-cart">
                        Tu carrito está vacío
                    </p>
                ) : (
                    items.map((producto) => (
                        <CartItem
                            key={producto._id}
                            producto={producto}
                        />
                    ))
                )}

            </div>

            <div className="mini-cart-footer">

                <div className="mini-cart-total">
                    <span>Total:</span>
                    <strong>${total}</strong>
                </div>

                <button
                    className="mini-cart-button"
                    onClick={() => navigate("/cart")}
                >
                    Pagar
                </button>

            </div>

        </div>
    );
}