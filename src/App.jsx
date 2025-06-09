import { useState, useEffect } from "react";
import "./App.css";
import CalorieInfo from "./components/CalorieInfo";
import WeekGrid from "./components/WeekGrid";
import Navbar from "./components/Navbar";

//TODO: 
//Refactorizar el código para que sea más limpio y modular
// useContext?



function App() {
  const [foodItems, setFoodItems] = useState(() => {
    const saved = localStorage.getItem("foodItems");
    return saved ? JSON.parse(saved) : [
      { id: "pollo", name: "Pollo", kcal: 165, protein: 31, carbs: 0, nota: "Ideal para la cena" },
      { id: "arroz", name: "Arroz", kcal: 130, protein: 2.7, carbs: 28 , nota: ""},
    ];
  });

  const [weekMeals, setWeekMeals] = useState(() => JSON.parse(localStorage.getItem("weekMeals")) || {});

  const [nuevaComida, setNuevaComida] = useState({ name: "", kcal: 0, protein: 0, carbs: 0 , nota: ""});

  const [usuario, setUsuario] = useState(() => {
    const saved = localStorage.getItem("usuario");
    return saved ? JSON.parse(saved) : {
      peso: "74", altura: "168", edad: "32", sexo: "hombre", actividad: "1.55",proteinas: "200", carbohidratos: "300", modo: "definicion"
    };
  });

  useEffect(() => {
    
    localStorage.setItem("foodItems", JSON.stringify(foodItems));
    localStorage.setItem("weekMeals", JSON.stringify(weekMeals));
    localStorage.setItem("usuario", JSON.stringify(usuario));
  }, [foodItems, weekMeals, usuario]);


  const handleBloqueDrop = (diaOrigen, tipoOrigen, diaDestino, tipoDestino) => {
    if (diaOrigen === diaDestino && tipoOrigen === tipoDestino) return;
  
    setWeekMeals(prev => {
      // Clon profundo del objeto
      const copia = JSON.parse(JSON.stringify(prev));
  
      // Asegurar que existen las entradas
      if (!copia[diaOrigen]) copia[diaOrigen] = { comida: [], cena: [], batido: [] };
      if (!copia[diaDestino]) copia[diaDestino] = { comida: [], cena: [], batido: [] };
  
      const origen = copia[diaOrigen][tipoOrigen];
      const destino = copia[diaDestino][tipoDestino];
  
      // Si no hay nada que mover, salir
      if (!origen || origen.length === 0) return prev;
  
      // Si el destino está vacío, simplemente mover
      if (!destino || destino.length === 0) {
        copia[diaDestino][tipoDestino] = origen;
        copia[diaOrigen][tipoOrigen] = [];
      } else {
        // Intercambiar
        copia[diaDestino][tipoDestino] = origen;
        copia[diaOrigen][tipoOrigen] = destino;
      }
  
      return copia;
    });
  };
  

  const handleDrop = (toDia, toTipo, data) => {
    const parsedData = typeof data === "string" ? JSON.parse(data) : data;
  
    if (!parsedData || parsedData.tipo !== "comida") return;
  
    const { uid, fromDia, fromTipo } = parsedData;
  
    setWeekMeals((prev) => {
      const copia = structuredClone(prev);
  
      const comida = copia[fromDia]?.[fromTipo]?.find((item) => item.uid === uid);
      if (!comida) return prev;
  
      copia[fromDia][fromTipo] = copia[fromDia][fromTipo].filter((item) => item.uid !== uid);
  
      if (!copia[toDia]) copia[toDia] = { comida: [], cena: [], batido: [] };
      if (!copia[toDia][toTipo]) copia[toDia][toTipo] = [];
  
      copia[toDia][toTipo].push(comida);
  
      return copia;
    });
  
 
  
  };
  

  




const editarComida = (comidaActualizada) => {
  setFoodItems((prev) =>
    prev.map((item) => (item.id === comidaActualizada.id ? comidaActualizada : item))
  );

  // 2. Actualizar la comida en weekMeals
  setWeekMeals((prev) => {
    const nuevo = { ...prev };

    for (const dia in nuevo) {
      for (const tipo in nuevo[dia]) {
        nuevo[dia][tipo] = nuevo[dia][tipo].map((item) => {
          if (item.id === comidaActualizada.id) {
            // Mantener uid y grams, pero actualizar los valores de la comida
            return {
              ...item,
              name: comidaActualizada.name,
              kcal: comidaActualizada.kcal,
              protein: comidaActualizada.protein,
              carbs: comidaActualizada.carbs,
              nota: comidaActualizada.nota || "",
            };
          }
          return item;
        });
      }
    }

    return nuevo;
  });
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

    setWeekMeals(prev => {
      const nuevo = {}

      for(const dia in prev){
        nuevo[dia] = {};
        for(const tipo in prev[dia]){
          nuevo[dia][tipo] = prev[dia][tipo].filter(item => item.id !== id);
        }
      }
      return nuevo;
    })
  };

  const agregarComida = () => {
    const nueva = {
      id: nuevaComida.name.toLowerCase().replace(/\s+/g, "-"),
      name: nuevaComida.name,
      kcal: parseInt(nuevaComida.kcal) || 0,
      protein: parseInt(nuevaComida.protein) || 0,
      carbs: parseInt(nuevaComida.carbs) || 0,
      nota: nuevaComida.nota || "",
    };
    setFoodItems(prev => [...prev, nueva]);
    setNuevaComida({ name: "", kcal: 0, protein: 0, carbs: 0, nota: "" });
  };

  return (
    <>
      <Navbar
        usuario={usuario}
        setUsuario={setUsuario}
        nuevaComida={nuevaComida}
        setNuevaComida={setNuevaComida}
        agregarComida={agregarComida}
        foodItems={foodItems}
        borrarComida={borrarComida}
        editarComida={editarComida}
      />
      

    <main className="App">
      <h1>Planificador de Comidas</h1>
      <h2>⚡ KcalWeek ⚡</h2>
      <CalorieInfo usuario={usuario} weekMeals={weekMeals} />

 

      <WeekGrid
        weekMeals={weekMeals}
        handleDrop={handleDrop}
        handleGramsChange={handleGramsChange}
        deleteMeal={deleteMeal}
        usuario={usuario}
      foodItems={foodItems}
      setFoodItems={setFoodItems}
      setWeekMeals={setWeekMeals}
      handleBloqueDrop={handleBloqueDrop}
     
      />
    </main>
    <footer className="footer">
      <p>© 2025 KcalWeek. Todos los derechos reservados.</p>
      <p>Desarrollado con ❤️ por <a href="https://github.com/TamaraFdez">Tamara Fernandez</a></p>
      </footer>
    </>
  );
}

export default App;
