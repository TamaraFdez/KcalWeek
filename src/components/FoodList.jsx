export default function FoodList({ foodItems, borrarComida }) {
    return (
      <div className="food-list">
        <h2>Lista de Comidas</h2>
        <ul className="food-items">
          {foodItems.map(item => (
            <li key={item.id}  className="draggrable-item">
              <p><strong>{item.name}</strong> </p>
              <p>{item.kcal} kcal/100g </p>
              <p>{item.protein}g Proteinas </p>
              <p>{item.carbs}g Carbohidratos </p>
              <p style={{
                display: item.note === "" ? "none" : "block",
                fontStyle: "italic",
              }}>{item.nota}</p>
              <button className="boton-delete" onClick={() => borrarComida(item.id)}>✖</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  