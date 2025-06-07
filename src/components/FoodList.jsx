export default function FoodList({ foodItems, borrarComida }) {
    return (
      <div className="food-list">
        <h2>Lista de Comidas</h2>
        <ul className="food-items">
          {foodItems.map(item => (
            <li key={item.id}  className="draggrable-item">
              <p><strong>{item.name}</strong> <br />
              {item.kcal} kcal/100g <br />
              {item.protein}g Proteinas <br />
              {item.carbs}g Carbohidratos </p>
              <button className="boton-delete" onClick={() => borrarComida(item.id)}>✖</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  