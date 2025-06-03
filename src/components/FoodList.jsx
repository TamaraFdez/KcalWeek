export default function FoodList({ foodItems, handleDragStart, borrarComida }) {
    return (
      <div className="food-list">
        <h2>Lista de Comidas</h2>
        <ul className="food-items">
          {foodItems.map(item => (
            <li key={item.id} draggable onDragStart={() => handleDragStart(item.id)} className="draggrable-item">
              {item.name} - {item.kcal} kcal/100g
              <button className="boton-delete" onClick={() => borrarComida(item.id)}>✖</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  