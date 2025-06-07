export default function UserForm({ usuario, setUsuario }) {
    return (
      <div className="user-form">
        <h2>Datos del usuario</h2>
        <label>Peso en Kg:{" "}
          <input type="number" value={usuario.peso} onChange={(e) => setUsuario((u) => ({ ...u, peso: e.target.value }))} />
        </label>
        <label>Altura en cm:{" "}
          <input type="number" value={usuario.altura} onChange={(e) => setUsuario((u) => ({ ...u, altura: e.target.value }))} />
        </label>
        <label>Edad:{" "}
          <input type="number" value={usuario.edad} onChange={(e) => setUsuario((u) => ({ ...u, edad: e.target.value }))} />
        </label>
        <label>Sexo:{" "}
          <select value={usuario.sexo} onChange={(e) => setUsuario((u) => ({ ...u, sexo: e.target.value }))}>
            <option value="hombre">Hombre</option>
            <option value="mujer">Mujer</option>
          </select>
        </label>
        <label>Actividad:{" "}
          <select value={usuario.actividad} onChange={(e) => setUsuario((u) => ({ ...u, actividad: e.target.value }))}>
            <option value="1.2">Sedentario</option>
            <option value="1.375">Ligero</option>
            <option value="1.55">Moderado</option>
            <option value="1.725">Intenso</option>
            <option value="1.9">Muy intenso</option>
          </select>
        </label>
        <label>Proteinas:{" "}
          <input type="number" value={usuario.proteinas} onChange={(e) => setUsuario((u) => ({ ...u, proteinas: e.target.value }))} />
        </label>
        <label>
          Carbohidratos:{" "}
          <input type="number" value={usuario.carbohidratos} onChange={(e) => setUsuario((u) => ({ ...u, carbohidratos: e.target.value }))} />
        </label>
        <div className="modo-container">
          <strong>Modo:</strong>
        <label >
        <input type="radio" name="modo" id="modo" value="Definicion" checked={usuario.modo === "Definicion"}onChange={(e) => setUsuario((u) => ({ ...u, modo: e.target.value}))}/>
         {" "} Déficit
        </label>
        <label>
        <input type="radio" name="modo" id="modo" value="Mantenimiento" checked={usuario.modo === "Mantenimiento"} onChange={(e) => setUsuario((u) => ({ ...u, modo: e.target.value}))}/>
          {" "}Mantenimiento
        </label>
        <label>
        <input type="radio" name="modo" id="modo" value="Volumen" checked={usuario.modo === "Volumen"} onChange={(e) => setUsuario((u) => ({ ...u, modo: e.target.value}))}/>
         {" "} Superávit
        </label>
      
        </div>
        </div>
    );
  }
  