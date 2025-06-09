import calcularMacrosPorGramos from "../utils/calcularMacrosPorGramos";
import { useState } from "react";

export default function ComidaItem({ item, dia, tipo, handleGramsChange, deleteMeal }){
    const macros = calcularMacrosPorGramos(item);
    const [hovered, setHovered] = useState(false);
    const [mostrasNota, setMostrarNota] = useState(false);

    return(
        <div className="meal-item" key={item.uid} 
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => setMostrarNota(prev => !prev)}>
            <strong>{item.name}</strong>
            <br />
            {Math.round(macros.kcal)} Kcal,{" "}
            {Math.round(macros.protein)}g Protein,{" "}
            {Math.round(macros.carbs)}g Carbs
            {(hovered || mostrasNota) && item.nota && (<div className="nota-comida">
                <strong>Nota:</strong> {item.nota}
            </div>)}
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