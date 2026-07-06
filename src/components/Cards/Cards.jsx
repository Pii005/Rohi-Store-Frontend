import "./Cards.css";

export default function Cards({ imagen, nombre, precio }) {
  return (
    <div className="card">
      <div className="card-img-wrapper">
        <img src={imagen} alt={nombre} className="card-img" />
      </div>
      <div className="card-info">
        <p className="card-precio">${precio}</p>
        <p className="card-nombre">{nombre}</p>
      </div>
    </div>
  );
}