import calcularTotales from "../utils/calcularTotales";

export default function WeekGrid({
  weekMeals,
  handleDrop,
  handleGramsChange,
  deleteMeal,
}) {
  const diasSemana = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];
  const totalSemana = {
    kcal: 0,
    protein: 0,
    carbs: 0,
  };
  const tipos = ["comida", "cena"];

  return (
    <div className="week-grid">
      {diasSemana.map((dia) => {
        const diaData = weekMeals[dia] || { comida: [], cena: [] };
        let totalDia = { kcal: 0, protein: 0, carbs: 0 };
        return (
          <div className="day-column" key={dia}>
            <h3>{dia}</h3>
            {tipos.map((tipo) => {
              const comidas = diaData[tipo] || [];
              const totales = calcularTotales(comidas);
              //sumar diario y semanal
              totalDia.kcal += totales.kcal;
              totalDia.protein += totales.protein;
              totalDia.carbs += totales.carbs;

              //sumar total semanal
              totalSemana.kcal += totales.kcal;
              totalSemana.protein += totales.protein;
              totalSemana.carbs += totales.carbs;
              return (
                <div
                key={tipo}
                className="meal-dropzone"
                onDrop={(e) => { 
                    e.preventDefault()
                    e.stopPropagation();
                    handleDrop(dia, tipo)
        
                }}
                onDragOver={(e) => {e.preventDefault()
                    e.stopPropagation()}}
                >
                <div
                  className="meal-type"
                  key={`${dia}-${tipo}`}
                
            
                >
                  <h4>{tipo === "comida" ? "🍽️ Comida" : "🌙 Cena"}</h4>
                  {comidas.map((item) => (
                    <div key={item.uid} className="meal-item">
                      {item.name}
                      <input
                        type="number"
                        value={item.grams}
                        onChange={(e) => handleGramsChange(dia, tipo, item.uid, e.target.value)}
                        className="grams-input"
                      />
                      g
                      <button
                        className="boton-delete"
                        onClick={() => deleteMeal(dia, tipo, item.uid)}
                      >
                        ❌
                      </button>
                    </div>
                  ))}
                  <div className="totals">
                    <strong>Total {tipo}: </strong> {Math.round(totales.kcal)}{" "}
                    Kcal, {Math.round(totales.protein)}g Protein,{" "}
                    {Math.round(totales.carbs)}g Carbs
                  </div>
                </div>
                </div>
                
              );
            })}
            <div className="totals-dia">
              <strong>Total {dia}: </strong> {Math.round(totalDia.kcal)} Kcal,{" "}
              {Math.round(totalDia.protein)}g Protein,{" "}
              {Math.round(totalDia.carbs)}g Carbs
            </div>
          </div>
        );
      })}

      <div className="totals-semana">
        <h3>Resumen Semanal</h3>
        <strong>Total Semana: </strong> {Math.round(totalSemana.kcal)} Kcal,{" "}
        {Math.round(totalSemana.protein)}g Protein,{" "}
        {Math.round(totalSemana.carbs)}g Carbs
      </div>
    </div>
  );
}
