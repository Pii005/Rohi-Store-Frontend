import "./CustomOrderBanner.css";

export default function CustomOrderBanner() {
  const handleWhatsapp = () => {
    window.open("https://wa.me/5491161888244?text=Hola!%20Quiero%20hacer%20un%20pedido%20personalizado", "_blank");
  };

  return (
    <div className="custom-banner">
      <div className="custom-banner-text">
        <p className="custom-banner-title">¿Queres algo unico?</p>
        <p className="custom-banner-subtitle">Hace tu pedido personalizado</p>
      </div>
      <button className="custom-banner-btn" onClick={handleWhatsapp}>
        Hablemos por whatsapp
      </button>
    </div>
  );
}