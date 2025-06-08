import calcularTotales from "../utils/calcularTotales";
import BloqueTipoComida from "./BloqueTipoComida";
import añadirComidaADia from "../utils/añadirComidaADia";


export default function WeekGrid({
  weekMeals,
  handleDrop,
  handleGramsChange,
  deleteMeal,
  usuario,
  foodItems,
  setFoodItems,
  setWeekMeals,
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
  const tipos = ["comida", "cena", "batido"];

  return (
    <>
    
      <div className="week-grid">
        {diasSemana.map((dia) => {
          const diaData = weekMeals[dia] || Object.fromEntries(tipos.map(tipo => [tipo, []]));
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
                 <BloqueTipoComida
                    key={`${dia}-${tipo}`}
                    comidas={comidas}
                    tipo={tipo}
                    dia={dia}
                    handleDrop={handleDrop}
                    handleGramsChange={handleGramsChange}
                    deleteMeal={deleteMeal}
                    foodItems={foodItems}
                    setFoodItems={setFoodItems}
                    añadirComidaADia={añadirComidaADia}
                    setWeekMeals={setWeekMeals}
                    weekMeals={weekMeals}
                 />
                );
              })}
              <div className="totals-dia">
                <strong>Total {dia}: </strong> {Math.round(totalDia.kcal)} Kcal,{" "}
                {Math.round(totalDia.protein)}g Protein,{" "}
                {Math.round(totalDia.carbs)}g Carbs
                <br />
                <span
                  style={{
                    color:
                      totalDia.protein < usuario.proteinas
                        ? "orange"
                        : "lightgreen",
                  }}
                >
                  {totalDia.protein < usuario.proteinas
                    ? `Faltan ${Math.round(
                        usuario.proteinas - totalDia.protein
                      )}g de proteínas `
                    : `¡Objetivo de proteínas alcanzado! `}
                </span>
                <br />
                <span
                  style={{
                    color:
                      totalDia.carbs < usuario.carbohidratos
                        ? "orange"
                        : "lightgreen",
                  }}
                >
                  {totalDia.carbs < usuario.carbohidratos
                    ? `Faltan ${Math.round(
                        usuario.carbohidratos - totalDia.carbs
                      )}g de carbohidratos`
                    : `¡Objetivo de carbohidratos alcanzado!`}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="totals-semana">
        <h3>Resumen Semanal</h3>
        <strong>Total Semana: </strong> {Math.round(totalSemana.kcal)} Kcal,{" "}
        {Math.round(totalSemana.protein)}g Protein,{" "}
        {Math.round(totalSemana.carbs)}g Carbs
        <p
          style={{
            color:
              totalSemana.protein < usuario.proteinas * 7
                ? "orange"
                : "lightgreen",
          }}
        >
          {totalSemana.protein < usuario.proteinas * 7
            ? `Faltan ${Math.round(
                usuario.proteinas * 7 - totalSemana.protein
              )}g de proteínas esta semana`
            : `¡Meta semanal de proteínas cumplida!`}
        </p>
      </div>
    </>
  );
}
