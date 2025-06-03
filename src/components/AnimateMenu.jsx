import { useState, useEffect } from "react";

const AnimatedMenu = ({ isOpen, onClose, children }) => {
  const [showContent, setShowContent] = useState(false);

  // Controlar el contenido para que aparezca solo cuando el círculo esté expandido
  useEffect(() => {
    let timer;
    if (isOpen) {
      timer = setTimeout(() => setShowContent(true), 500); // coincide con duración transición
    } else {
      setShowContent(false);
    }
    return () => clearTimeout(timer);
  }, [isOpen]);

  // Cerrar al hacer clic fuera (usamos evento global)
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      if (!event.target.closest(".menu-circle")) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <div className={`menu-circle ${isOpen ? "open" : ""}`}>
      <div className={`menu-content ${showContent ? "visible" : ""}`}>
        {showContent && children}
      </div>
    </div>
  );
};

export default AnimatedMenu;


