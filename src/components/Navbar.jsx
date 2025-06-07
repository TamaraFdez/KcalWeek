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
  // const [mostrar, setMostrar] = useState(false);
  const [mostrarUserForm, setMostrarUserForm] = useState(false);
  const [mostrarAddFoodForm, setMostrarAddFoodForm] = useState(false);
  const dropdownRef = useRef();


  // Cerrar al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMostrarAddFoodForm(false);
        setMostrarUserForm(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
        <div className="navbar-header">
                
      <h2>KcalWeek </h2>
      <div className="nav-btn">
      <button onClick={() => setMostrarAddFoodForm((prev) => !prev)} className="dropdown-toggle">
        ⚙️ Añadir Comidas
      </button> 
      <button onClick={() => setMostrarUserForm((prev) => !prev)} className="dropdown-toggle">
        ⚙️ Configuración usuario
      </button> </div> </div>
      <h1>Planificador de Comidas</h1>

      {mostrarAddFoodForm && (
        <div ref={dropdownRef} className="dropdown-menu">
          <AddFoodForm
            nuevaComida={nuevaComida}
            setNuevaComida={setNuevaComida}
            agregarComida={agregarComida}
          />
          <button onClick={() => setMostrarAddFoodForm(false)} className="close-btn">
            ✖ Cerrar
          </button>
          </div>
         
      )}
      {mostrarUserForm && (
        <div ref={dropdownRef} className="dropdown-menu">
          
          <UserForm usuario={usuario} setUsuario={setUsuario} />
          <button onClick={() => setMostrarUserForm(false)} className="close-btn">
            ✖ Cerrar
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

