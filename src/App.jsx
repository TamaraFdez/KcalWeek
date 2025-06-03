import { useState, useEffect } from "react";
import "./App.css";
import CalorieInfo from "./components/CalorieInfo";
import FoodList from "./components/FoodList";
import WeekGrid from "./components/WeekGrid";
import Navbar from "./components/Navbar";
import AddFoodForm from "./components/AddFoodForm";
import UserForm from "./components/UserForm";

const diasSemana = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];

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
    localStorage.setItem("foodItems", JSON.stringify(foodItems));
    localStorage.setItem("weekMeals", JSON.stringify(weekMeals));
    localStorage.setItem("usuario", JSON.stringify(usuario));
  }, [foodItems, weekMeals, usuario]);

  const handleDragStart = (id) => setDraggedFoodId(id);

  const handleDrop = (dia) => {
    const comida = foodItems.find(item => item.id === draggedFoodId);
    if (!comida) return;
    const nueva = { ...comida, uid: `${comida.id}-${Date.now()}`, grams: 100 };
    setWeekMeals(prev => ({ ...prev, [dia]: [...(prev[dia] || []), nueva] }));
  };

  const handleGramsChange = (dia, uid, grams) => {
    setWeekMeals(prev => ({
      ...prev,
      [dia]: prev[dia].map(item =>
        item.uid === uid ? { ...item, grams: parseInt(grams) || 0 } : item
      ),
    }));
  };

  const deleteMeal = (dia, uid) => {
    setWeekMeals(prev => ({
      ...prev,
      [dia]: prev[dia].filter(item => item.uid !== uid),
    }));
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
        diasSemana={diasSemana}
        weekMeals={weekMeals}
        handleDrop={handleDrop}
        handleGramsChange={handleGramsChange}
        deleteMeal={deleteMeal}
      />
    </div>
  );
}

export default App;
