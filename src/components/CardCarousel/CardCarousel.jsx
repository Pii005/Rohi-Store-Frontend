import { useRef } from "react";
import Cards from "../Cards/Cards";
import "./CardCarousel.css";

export default function CardCarousel({ titulo, productos }) {
  const scrollRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const velocity = useRef(0);
  const lastX = useRef(0);
  const animFrame = useRef(null);

  const scroll = (direction) => {
    scrollRef.current.scrollBy({
      left: direction === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  const onMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
    lastX.current = e.pageX;
    velocity.current = 0;
    cancelAnimationFrame(animFrame.current);
    scrollRef.current.style.cursor = "grabbing";
  };

  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;

    // guarda velocidad para la inercia
    velocity.current = e.pageX - lastX.current;
    lastX.current = e.pageX;
  };

  const onMouseUp = () => {
    isDragging.current = false;
    scrollRef.current.style.cursor = "grab";
    applyInertia();
  };

  const onMouseLeave = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    scrollRef.current.style.cursor = "grab";
    applyInertia();
  };

  // inercia: sigue moviéndose y frena suavemente
  const applyInertia = () => {
    if (Math.abs(velocity.current) < 0.5) return;

    scrollRef.current.scrollLeft -= velocity.current;
    velocity.current *= 0.92; // fricción (más cerca de 1 = más largo el deslizamiento)

    animFrame.current = requestAnimationFrame(applyInertia);
  };

  return (
    <div className="carousel-section">
      <h2 className="carousel-title">{titulo}</h2>

      <div className="carousel-wrapper">
        {/* <button className="carousel-btn" onClick={() => scroll("left")}>
          <svg width="10" height="18" viewBox="0 0 10 18" fill="none">
            <path d="M9 1L1 9L9 17" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button> */}

        <div
          className="carousel-track"
          ref={scrollRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
        >
          {productos.map((p) => (
            <div className="carousel-item" key={p.id}>
              <Cards nombre={p.nombre} precio={p.precio} imagen={p.imagen} />
            </div>
          ))}
        </div>

        {/* <button className="carousel-btn" onClick={() => scroll("right")}>
          <svg width="10" height="18" viewBox="0 0 10 18" fill="none">
            <path d="M1 1L9 9L1 17" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button> */}
      </div>
    </div>
  );
}