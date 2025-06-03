import { useState, useEffect, useRef } from "react";
import UserForm from "./UserForm";
import AddFoodForm from "./AddFoodForm";

const Navbar = ({
  usuario,
  setUsuario,
  nuevaComida,
  setNuevaComida,
  agregarComida,
}) => {
  const [mostrarFormularios, setMostrarFormularios] = useState(false);
  const dropdownRef = useRef();

  const toggleDropdown = () => {
    setMostrarFormularios((prev) => !prev);
  };

  // Cerrar al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMostrarFormularios(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
        <div className="navbar-header">
                
      <h2>KcalWeek </h2>
     
      <button onClick={toggleDropdown} className="dropdown-toggle">
        ⚙️ Configuración
      </button> 
      </div>
      <h1>Planificador de Comidas</h1>

      {mostrarFormularios && (
        <div ref={dropdownRef} className="dropdown-menu">
          <AddFoodForm
            nuevaComida={nuevaComida}
            setNuevaComida={setNuevaComida}
            agregarComida={agregarComida}
          />
          <UserForm usuario={usuario} setUsuario={setUsuario} />
          <button onClick={() => setMostrarFormularios(false)} className="close-btn">
            ✖ Cerrar
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

