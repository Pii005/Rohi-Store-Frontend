import { useState } from "react";
import "./Login.css";
import HeaderHome from "../../components/Header/Header";
import { loginUser } from "../../services/api";
import { Link } from "react-router-dom";
import { saveAuthSession } from "../../services/authService";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const data = await loginUser(email, password);

            saveAuthSession(data);

            navigate("/");
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            alert(error.message);
        }
    };

    return (
        <div className="login-page">

            <HeaderHome />

            <main className="login-container">

                <section className="login-card">

                    <div className="login-header">
                        <h1>Bienvenido</h1>
                        <p>Ingresá a tu cuenta de Rohi</p>
                    </div>

                    <form onSubmit={handleSubmit}>

                        <div className="form-group">
                            <label htmlFor="email">Correo electrónico</label>

                            <input
                                id="email"
                                type="email"
                                placeholder="Ingresá tu correo"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Contraseña</label>

                            <input
                                id="password"
                                type="password"
                                placeholder="Ingresá tu contraseña"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="login-button"
                        >
                            Iniciar sesión
                        </button>

                    </form>

                    <div className="login-register">
                        <p>¿Todavía no tenés una cuenta?</p>
                        <Link to="/register">
                            Crear una cuenta
                        </Link>
                    </div>
                </section>

            </main>

            {/* <Footer /> */}

        </div>
    );
}