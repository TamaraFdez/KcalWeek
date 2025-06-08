import { useState, useEffect, useRef } from "react";
import UserForm from "./UserForm";
import FoodList from "./FoodList";
import AddFoodForm from "./AddFoodForm";

const Navbar = ({
  usuario,
  setUsuario,
  nuevaComida,
  setNuevaComida,
  agregarComida,
  foodItems,
  borrarComida,
  editarComida,
}) => {
  // const [mostrar, setMostrar] = useState(false);
  const [mostrarUserForm, setMostrarUserForm] = useState(false);
  const [mostrarAddFoodForm, setMostrarAddFoodForm] = useState(false);
  const [mostrarFoodList, setMostrarFoodList] = useState(false);
  const dropdownRef = useRef();


  // Cerrar al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMostrarAddFoodForm(false);
        setMostrarUserForm(false);
        setMostrarFoodList(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
        <div className="navbar-header">
                
      <img className="logo" src="./logokcalweek-colorv2.png" alt="Logo a color de kcalWeek, una K con degradado de violeta a cian y un rayo atravesandola" />
      <div className="nav-btn">
      <button onClick={() => setMostrarAddFoodForm((prev) => !prev)} className="dropdown-toggle">
      📝 Añadir Comidas
      </button> 
      <button onClick={() => setMostrarUserForm((prev) => !prev)} className="dropdown-toggle">
        ⚙️ Configuración usuario
      </button>
      <button onClick={() => setMostrarFoodList((prev) => !prev)} className="dropdown-toggle">
      📋 Lista de Alimentos
      </button> 
       </div> </div>
      

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
       {mostrarFoodList && (
        <div ref={dropdownRef} className="dropdown-menu">
          
          <FoodList
             agregarComida={agregarComida}
             foodItems={foodItems}
             borrarComida={borrarComida}
              editarComida={editarComida}

          />
          <button onClick={() => setMostrarFoodList(false)} className="close-btn">
            ✖ Cerrar
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

