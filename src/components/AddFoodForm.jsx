export default function AddFoodForm({ nuevaComida, setNuevaComida, agregarComida }) {
    return (
      <div className="add-food-form">
        <h2>Añadir nueva comida</h2>
        <label>Comida:{" "}
          <input type="text" value={nuevaComida.name} onChange={(e) => setNuevaComida({ ...nuevaComida, name: e.target.value })} />
        </label>
        <label>Kcal/100gr:{" "}
          <input type="number" value={nuevaComida.kcal} onChange={(e) => setNuevaComida({ ...nuevaComida, kcal: e.target.value })} />
        </label>
        <label>Proteínas/100gr:{" "}
          <input type="number" value={nuevaComida.protein} onChange={(e) => setNuevaComida({ ...nuevaComida, protein: e.target.value })} />
        </label>
        <label>Carbohidratos/100gr:{" "}
          <input type="number" value={nuevaComida.carbs} onChange={(e) => setNuevaComida({ ...nuevaComida, carbs: e.target.value })} />
        </label>
        <label>
          Nota:{" "}
          <input type="text" />
        </label>
        <button onClick={agregarComida}>Añadir</button>
      </div>
    );
  }
  