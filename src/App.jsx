import { useState, useEffect } from "react";
import "./App.css";
import CalorieInfo from "./components/CalorieInfo";
import FoodList from "./components/FoodList";
import WeekGrid from "./components/WeekGrid";
import Navbar from "./components/Navbar";
import AddFoodForm from "./components/AddFoodForm";
import UserForm from "./components/UserForm";



function App() {
  const [foodItems, setFoodItems] = useState(() => {
    const saved = localStorage.getItem("foodItems");
    return saved ? JSON.parse(saved) : [
      { id: "pollo", name: "Pollo", kcal: 165, protein: 31, carbs: 0 },
      { id: "arroz", name: "Arroz", kcal: 130, protein: 2.7, carbs: 28 },
    ];
  });

  const [weekMeals, setWeekMeals] = useState(() => JSON.parse(localStorage.getItem("weekMeals")) || {});
  const [draggedFoodId, setDraggedFoodId] = useState(null);
  const [nuevaComida, setNuevaComida] = useState({ name: "", kcal: 0, protein: 0, carbs: 0 });

  const [usuario, setUsuario] = useState(() => {
    const saved = localStorage.getItem("usuario");
    return saved ? JSON.parse(saved) : {
      peso: "70", altura: "175", edad: "30", sexo: "hombre", actividad: "1.55",
    };
  });

  useEffect(() => {
    console.log("Guardando datos en localStorage", weekMeals);
    localStorage.setItem("foodItems", JSON.stringify(foodItems));
    localStorage.setItem("weekMeals", JSON.stringify(weekMeals));
    localStorage.setItem("usuario", JSON.stringify(usuario));
  }, [foodItems, weekMeals, usuario]);

  const handleDragStart = (id) => setDraggedFoodId(id);

const handleDrop = (dia, tipo) => {
  const comida = foodItems.find(item => item.id === draggedFoodId);
  if (!comida) return;

  const nueva = {
    ...comida,
    uid: `${comida.id}-${Date.now()}-${Math.random()}`,
    grams: 100,
  };

  setWeekMeals(prev => {
    const copia = { ...prev };
    if (!copia[dia]) copia[dia] = { comida: [], cena: [] };
    else{
      if (!copia[dia].comida) copia[dia].comida = [];
      if(!copia[dia].cena) copia[dia].cena = [];
    }
    const yaExiste = copia[dia][tipo]?.some(item => item.id === draggedFoodId);
    if (yaExiste){
      console.log("Ya existe una comida de este tipo en este día");
      return prev;
    } 

    copia[dia][tipo] = [...(copia[dia][tipo] || []), nueva];
    console.log(`Añadida ${comida.name} a ${dia} - ${tipo}`);
    return copia;
  });

  setDraggedFoodId(null); 
};


  const handleGramsChange = (dia, tipo, uid, grams) => {
    setWeekMeals(prev => {
      const copia = {...prev };
      copia[dia][tipo] = prev[dia][tipo].map(item =>
        item.uid === uid ? { ...item, grams: parseInt(grams) || 0 } : item
      )
      return copia;
    });
  };

  const deleteMeal = (dia, tipo, uid) => {
    setWeekMeals(prev => {
      const copia = { ...prev }
      copia[dia][tipo] = prev[dia][tipo].filter(item => item.uid !== uid);
      return copia
    });
  };

  const borrarComida = (id) => {
    setFoodItems(prev => prev.filter(item => item.id !== id));
  };

  const agregarComida = () => {
    const nueva = {
      id: nuevaComida.name.toLowerCase().replace(/\s+/g, "-"),
      name: nuevaComida.name,
      kcal: parseInt(nuevaComida.kcal) || 0,
      protein: parseInt(nuevaComida.protein) || 0,
      carbs: parseInt(nuevaComida.carbs) || 0,
    };
    setFoodItems(prev => [...prev, nueva]);
    setNuevaComida({ name: "", kcal: 0, protein: 0, carbs: 0 });
  };

  return (
    <div className="App">
      <Navbar
        usuario={usuario}
        setUsuario={setUsuario}
        nuevaComida={nuevaComida}
        setNuevaComida={setNuevaComida}
        agregarComida={agregarComida}
      />

      <CalorieInfo usuario={usuario} weekMeals={weekMeals} />

      <FoodList
        foodItems={foodItems}
        handleDragStart={handleDragStart}
        borrarComida={borrarComida}
      />

      <WeekGrid
        weekMeals={weekMeals}
        handleDrop={handleDrop}
        handleGramsChange={handleGramsChange}
        deleteMeal={deleteMeal}
      />
    </div>
  );
}

export default App;
