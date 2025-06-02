import { useState, useEffect } from "react";
import "./App.css";

const diasSemana = [
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sabado",
  "Domingo",
];

function App() {
  const [foodItems, setFoodItems] = useState(
    () => {
      const saved = localStorage.getItem("foodItems");
      if (saved) return JSON.parse(saved);
      return[
       { id: "pollo", name: "Pollo", kcal: 165, protein: 31, carbs: 0 },
       { id: "arroz", name: "Arroz", kcal: 130, protein: 2.7, carbs: 28 },
     
      ]
    }
  );
  const [weeMeals, setWeekMeals] = useState(
    () => JSON.parse(localStorage.getItem("weekMeals")) || diasSemana
  );
  const [draggedFoodId, setDraggedFoodId] = useState(null);

  const [nuevaComida, setNuevaComida] = useState({name: "", kcal: 0, protein: 0, carbs: 0});


  const agregarComida = () => {
    const nueva = {
      id: nuevaComida.name.toLowerCase().replace(/\s+/g, "-"),
      name: nuevaComida.name,
      kcal: parseInt(nuevaComida.kcal) || 0,
      protein: parseInt(nuevaComida.protein) || 0,
      carbs: parseInt(nuevaComida.carbs) || 0,
    }
    setFoodItems((prev) => [...prev, nueva]);
    setNuevaComida({name: "", kcal: 0, protein: 0, carbs: 0});
  }

  useEffect(() => {
    localStorage.setItem("foodItems", JSON.stringify(foodItems));
    localStorage.setItem("weekMeals", JSON.stringify(weeMeals));
  }, [foodItems, weeMeals]);

  const handleDragStart = (id) => {
    setDraggedFoodId(id);
  };
  const handleDrop = (dia) => {
    const comida = foodItems.find((item) => item.id === draggedFoodId);
    if (!comida) return;
    const nuevaComida = {
      ...comida,
      uid: `${comida.id}-${Date.now()}`,
      grams: 100,
    };

    setWeekMeals((prev) => ({
      ...prev,
      [dia]: [...(prev[dia] || []), nuevaComida],
    }));
  };

  const handleGramsChange = (dia, uid, grams) => {
    setWeekMeals((prev) => ({
      ...prev,
      [dia]: prev[dia].map((item) =>
        item.uid === uid ? { ...item, grams: parseInt(grams) || 0 } : item
      ),
    }));
  };

  const deleteMeal = (dia, uid) => {
    setWeekMeals((prev) => ({
      ...prev,
      [dia]: prev[dia].filter((item) => item.uid !== uid),
    }));
  };

  const calcularTotales = (comidas) => {
    return comidas.reduce(
      (acc, item) => {
        acc.kcal += (item.kcal * item.grams) / 100;      // ← usar item.grams, no foodItems.grams
        acc.protein += (item.protein * item.grams) / 100;
        acc.carbs += (item.carbs * item.grams) / 100;
        return acc;
      },
      { kcal: 0, protein: 0, carbs: 0 }
    );
  };

  const borrarComida = (id) => {
    setFoodItems((prev) => prev.filter((item) => item.id !== id));
  }
  return (
    <>
    <div className="App">
      <h1>Planificador de Comidas</h1>
      <div className="add-food-form">
        <h2>Añadir nueva comida</h2>
        <input type="text"
        placeholder="Pollo"
        value={nuevaComida.name} onChange={(e) => setNuevaComida({ ...nuevaComida, name: e.target.value})} />
        <input type="number"
        placeholder="Kcal/100g"
        value={nuevaComida.kcal} onChange={(e) => setNuevaComida({ ...nuevaComida, kcal: e.target.value})} />
        <input type="number"
        placeholder="Proteina/100g"
        value={nuevaComida.protein} onChange={(e) => setNuevaComida({ ...nuevaComida, protein: e.target.value})} />
        <input type="number"
        placeholder="Carbohidratos/100g"
        value={nuevaComida.carbs} onChange={(e) => setNuevaComida({ ...nuevaComida, carbs: e.target.value})} />
        <button onClick={agregarComida}>Añadir</button>
      </div>
      <div className="food-list">
        <h2>Lista de Comidas</h2>
        {foodItems.map((item) => (
          <div
            key={item.id}
            draggable
            onDragStart={() => handleDragStart(item.id)}
            className="draggrable-item"
          >
            {item.name} - {item.kcal} kcal/100g
            <button className="boton-delete" onClick={() => borrarComida(item.id)}>✖</button>

          </div>
        ))}
      </div>

      <div className="week-grid">
        {diasSemana.map((dia) => {
          const comidas = weeMeals[dia] || [];
          const totales = calcularTotales(comidas || []); ;
          return (
            <div
              className="day-column"
              key={dia}
              onDrop={() => handleDrop(dia)}
              onDragOver={(e) => e.preventDefault()}
            >
              <h3>{dia}</h3>
              {comidas.map((item) => (
                <div key={item.uid} className="meal-item">
                  {item.name}
                  <input
                    type="number"
                    value={item.grams}
                    onChange={(e) =>
                      handleGramsChange(dia, item.uid, e.target.value)
                    }
                    className="grams-input"
                  />
                  g <button className="boton-delete" onClick={() => deleteMeal(dia, item.uid)}>✖</button>
                </div>
              ))}
              <div className="totals">
                <strong>Total:</strong> {Math.round(totales.kcal)} kcal,{" "}
                {Math.round(totales.protein)}g protein,{" "}
                {Math.round(totales.carbs)}g carbs
              </div>
            </div>
          );
        })}
      </div>
    </div>
    </>
  );
}

export default App;
