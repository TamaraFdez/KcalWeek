import { useState } from "react";
import UserForm from "./UserForm";
import AddFoodForm from "./AddFoodForm";
import AnimatedMenu from "./AnimateMenu";

const Navbar = ({ usuario, setUsuario, nuevaComida, setNuevaComida, agregarComida }) => {
  const [mostrarFormularios, setMostrarFormularios] = useState(false);

  return (
    <nav className="navbar">
      <h1>Planificador de Comidas</h1>
      <button onClick={() => setMostrarFormularios((v) => !v)} className="dropdown-toggle">
        ⚙️ Configuración usuario y Añadir comida
      </button>

      <AnimatedMenu isOpen={mostrarFormularios} onClose={() => setMostrarFormularios(false)}>
        <AddFoodForm
          nuevaComida={nuevaComida}
          setNuevaComida={setNuevaComida}
          agregarComida={agregarComida}
        />
        <UserForm usuario={usuario} setUsuario={setUsuario} />
        <button onClick={() => setMostrarFormularios(false)} className="close-btn">
          ✖ Cerrar
        </button>
      </AnimatedMenu>
    </nav>
  );
};

export default Navbar;


