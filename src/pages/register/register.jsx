import { useState } from "react";
import "./register.css";
import HeaderHome from "../../components/Header/Header";
import { registerUser } from "../../services/api";
import { saveAuthSession } from "../../services/authService";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const validateForm = () => {
        const errors = [];

        const nombreLimpio = nombre.trim();
        const emailLimpio = email.trim();

        // Nombre
        if (!nombreLimpio) {
            errors.push("El nombre es obligatorio.");
        } else if (nombreLimpio.length < 2) {
            errors.push("El nombre debe tener al menos 2 caracteres.");
        } else if (nombreLimpio.length > 50) {
            errors.push("El nombre no puede superar los 50 caracteres.");
        } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/.test(nombreLimpio)) {
            errors.push("El nombre solo puede contener letras y espacios.");
        }

        // Email
        if (!emailLimpio) {
            errors.push("El correo electrónico es obligatorio.");
        } else if (/\s/.test(emailLimpio)) {
            errors.push("El correo electrónico no puede contener espacios.");
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailLimpio)
        ) {
            errors.push("Ingresá un correo electrónico válido.");
        }

        // Contraseña
        if (!password) {
            errors.push("La contraseña es obligatoria.");
        } else if (password.length < 8) {
            errors.push("La contraseña debe tener al menos 8 caracteres.");
        } else if (password.length > 64) {
            errors.push("La contraseña no puede superar los 64 caracteres.");
        } else if (!/[A-Z]/.test(password)) {
            errors.push("La contraseña debe contener al menos una mayúscula.");
        } else if (!/[a-z]/.test(password)) {
            errors.push("La contraseña debe contener al menos una minúscula.");
        } else if (!/[0-9]/.test(password)) {
            errors.push("La contraseña debe contener al menos un número.");
        } else if (!/[^A-Za-z0-9]/.test(password)) {
            errors.push("La contraseña debe contener al menos un carácter especial.");
        }

        return errors;
    };

    const [errors, setErrors] = useState([]);

        const handleSubmit = async (event) => {
        event.preventDefault();

        const validationErrors = validateForm();

        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors([]);

        try {
            const data = await registerUser(
                nombre.trim(),
                email.trim().toLowerCase(),
                password
            );

            saveAuthSession(data);

            console.log("Registro exitoso:", data);

            navigate("/");
        } catch (error) {
            console.error("Error en registro:", error);
            setErrors([error.message]);
        }
    };

    return (
        <div className="registro-page">

            <HeaderHome />

            <main className="registro-container">

                <section className="registro-card">

                    <div className="registro-header">
                        <h1>Crear cuenta</h1>
                        <p>Registrate en Rohi</p>
                    </div>

                    <form onSubmit={handleSubmit}>

                        <div className="form-group">
                            <label htmlFor="nombre">
                                Nombre
                            </label>

                            <input
                                id="nombre"
                                type="text"
                                placeholder="Ingresá tu nombre"
                                value={nombre}
                                maxLength={50}
                                onChange={(event) => setNombre(event.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">
                                Correo electrónico
                            </label>

                            <input
                                id="email"
                                type="email"
                                placeholder="Ingresá tu correo"
                                value={email}
                                maxLength={100}
                                onChange={(event) => setEmail(event.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">
                                Contraseña
                            </label>

                           <input
                                id="password"
                                type="password"
                                placeholder="Ingresá tu contraseña"
                                value={password}
                                minLength={8}
                                maxLength={64}
                                onChange={(event) => setPassword(event.target.value)}
                                required
                            />
                        </div>

                        {errors.length > 0 && (
                            <div className="registro-errors">
                                {errors.map((error, index) => (
                                    <p key={index}>{error}</p>
                                ))}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="registro-button"
                        >
                            Crear cuenta
                        </button>

                    </form>

                    <div className="registro-login">
                        <p>¿Ya tenés una cuenta?</p>

                        <a href="/login">
                            Iniciar sesión
                        </a>
                    </div>

                </section>

            </main>

        </div>
    );
}