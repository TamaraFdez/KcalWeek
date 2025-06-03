import calcularTotales from "../utils/calcularTotales";
  
  export default function WeekGrid({ diasSemana, weekMeals, handleDrop, handleGramsChange, deleteMeal }) {
    return (
      <div className="week-grid">
        {diasSemana.map(dia => {
          const comidas = weekMeals[dia] || [];
          const totales = calcularTotales(comidas);
          return (
            <div className="day-column" key={dia} onDrop={() => handleDrop(dia)} onDragOver={(e) => e.preventDefault()}>
              <h3>{dia}</h3>
              {comidas.map(item => (
                <div key={item.uid} className="meal-item">
                  {item.name}
                  <input
                    type="number"
                    value={item.grams}
                    onChange={(e) => handleGramsChange(dia, item.uid, e.target.value)}
                    className="grams-input"
                  />
                  g
                  <button className="boton-delete" onClick={() => deleteMeal(dia, item.uid)}>✖</button>
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
    );
  }
  