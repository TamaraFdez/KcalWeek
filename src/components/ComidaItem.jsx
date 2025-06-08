import calcularMacrosPorGramos from "../utils/calcularMacrosPorGramos";

export default function ComidaItem({ item, dia, tipo, handleGramsChange, deleteMeal }){
    const macros = calcularMacrosPorGramos(item);

    return(
        <div className="meal-item" key={item.uid}>
            <strong>{item.name}</strong>
            <br />
            {Math.round(macros.kcal)} Kcal,{" "}
            {Math.round(macros.protein)}g Protein,{" "}
            {Math.round(macros.carbs)}g Carbs
            <br />
            <label>
                <input
                    type="number"
                    value={item.grams}
                    onChange={(e) => handleGramsChange(dia, tipo, item.uid, e.target.value)}
                    className="grams-input"
                />
                g
            </label>
            <button className="boton-delete-dia" onClick={() => deleteMeal(dia, tipo, item.uid)}>
                ✖
            </button>

        </div>
    )
}