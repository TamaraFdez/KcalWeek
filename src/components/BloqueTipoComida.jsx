import { useState, useRef, useEffect } from "react";
import calcularTotales from "../utils/calcularTotales";
import ComidaItem from "./ComidaItem";

export default function BloqueTipoComida({
  comidas,
  tipo,
  dia,
  handleDrop,
  handleGramsChange,
  deleteMeal,
  foodItems,
  setWeekMeals,
  añadirComidaADia,
  weekMeals,
}) {
  const [busqueda, setBusqueda] = useState("");
  const [seleccionada, setSeleccionada] = useState(null);
  const [mostrarLista, setMostrarLista] = useState(false);
  const buscadorRef = useRef(null);
  const totales = calcularTotales(comidas);
  const etiqueta = {
    comida: "🍽️ Comida",
    cena: "🌙 Cena",
    batido: "🥤 Batido",
  };
  const yaAñadidas = (weekMeals[dia]?.[tipo] || []).map(c => c.id);

  useEffect(() => {
    function handleClickOutside(event) {
      if (buscadorRef.current && !buscadorRef.current.contains(event.target)) {
        setMostrarLista(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const sugerencias = foodItems
  .filter(comida =>
    comida.name.toLowerCase().includes(busqueda.toLowerCase())
  )
  .filter(comida => !yaAñadidas.includes(comida.id));

  return (
    <div
      className="meal-dropzone"
      onDrop={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleDrop(dia, tipo);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <div className="meal-type" key={`${dia}-${tipo}`}>
        <h4>{etiqueta[tipo] || tipo}</h4>

        {/* Lista de comidas */}
        {comidas.map((item) => (
          <ComidaItem
            item={item}
            dia={dia}
            tipo={tipo}
            handleGramsChange={handleGramsChange}
            deleteMeal={deleteMeal}
            key={item.uid}
          />
        ))}

        {/* Totales */}
        <div className="totals">
          <strong>Total {tipo}: </strong> {Math.round(totales.kcal)} Kcal,{" "}
          {Math.round(totales.protein)}g Protein, {Math.round(totales.carbs)}g
          Carbs
        </div>

        {/* Buscador y botón añadir */}
        <div style={{ position: "relative" } }ref={buscadorRef}>
          <input
            type="text"
            value={busqueda}
            onFocus={() => setMostrarLista(true)}
            onChange={(e) => {
              setBusqueda(e.target.value);
              setMostrarLista(true);
            }}
            placeholder="Buscar comida..."
            className="buscador-comida"
          />

          {mostrarLista && (
            <div className="lista-sugerencias">
              {sugerencias.length === 0 ? "No hay más en la lista, puedes añadir una nueva comida en el boton del menu":
                sugerencias.map((comida) => (
                <div
                  key={comida.id}
                  className="opcion-comida"
                  onClick={() => {
                    setSeleccionada(comida);
                    setMostrarLista(false);
                    setBusqueda(comida.name);
                  }}
                >
                  <strong>{comida.name}</strong> — {comida.kcal} Kcal /{" "}
                  {comida.protein}g Prot / {comida.carbs}g Carbs
                </div>
              ))}
            </div>
          )}

          {seleccionada && (
            <button
              onClick={() => {
                añadirComidaADia(setWeekMeals, seleccionada, dia, tipo);
                setSeleccionada(null);
                setBusqueda("");
              }}
              className="boton-anadir-comida"
            >
              Añadir {seleccionada.name}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
