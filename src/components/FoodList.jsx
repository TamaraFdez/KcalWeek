import { useState } from "react";

export default function FoodList({ foodItems, borrarComida, editarComida }) {
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ kcal: 0, protein: 0, carbs: 0 });

  const startEditing = (item) => {
    setEditId(item.id);
    setEditData({
      name: item.name,
      kcal: item.kcal,
      protein: item.protein,
      carbs: item.carbs,
      nota: item.nota || "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const saveEdit = () => {
    editarComida({
      id: editId,
      name: editData.name,
      kcal: Number(editData.kcal),
      protein: Number(editData.protein),
      carbs: Number(editData.carbs),
      nota: editData.nota || "",
    });
    setEditId(null);
  };

  const cancelEdit = () => {
    setEditId(null);
  };

  return (
    <div className="food-list">
      <h2>Lista de Comidas</h2>
      <ul className="food-items">
        {foodItems.map((item) => (
          <li key={item.id} className="draggable-item">
            <p>
              <strong>{item.name}</strong>
            </p>

            {editId === item.id ? (
              <>
                <input
                  type="text"
                  name="name"
                  value={editData.name}
                  onChange={handleChange}
                />

                <label>
                  <input
                    type="number"
                    name="kcal"
                    value={editData.kcal}
                    onChange={handleChange}
                    style={{ width: "60px" }}
                  />{" "}
                  kcal/100g
                </label>
                <label>
                  <input
                    type="number"
                    name="protein"
                    value={editData.protein}
                    onChange={handleChange}
                    style={{ width: "60px", marginLeft: "10px" }}
                  />{" "}
                 Proteínas /100g 
                </label>
                <label>
                  <input
                    type="number"
                    name="carbs"
                    value={editData.carbs}
                    onChange={handleChange}
                    style={{ width: "60px", marginLeft: "10px" }}
                  />{" "}
                  Carbohidratos/100g 
                </label>
                <label>
                Nota:{" "}
                  <input
                    type="text"
                    name="nota"
                    value={editData.nota || ""}
                    onChange={handleChange}
                    placeholder="Nota (opcional)"
                    style={{ width: "200px", marginLeft: "10px" }}
                  />
                
                </label>

                <div>
                  <button onClick={saveEdit} className="boton-guardar">
                    Guardar
                  </button>
                  <button onClick={cancelEdit} className="boton-cancelar">
                    Cancelar
                  </button>
                </div>
              </>
            ) : (
              <>
                <p>{item.kcal} kcal/100g</p>
                <p>{item.protein}g Proteínas</p>
                <p>{item.carbs}g Carbohidratos</p>
                {item.nota && <p className="nota">Nota: {item.nota}</p>}

                <div>
                  <button
                    className="boton-editar"
                    onClick={() => startEditing(item)}
                  >
                    ✎ Editar
                  </button>
                  <button
                    className="boton-delete"
                    onClick={() => borrarComida(item.id)}
                  >
                    ✖
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
