export default function CalorieInfo({ usuario }) {
    const p = parseFloat(usuario.peso);
    const a = parseFloat(usuario.altura);
    const e = parseInt(usuario.edad);
    const tbm = usuario.sexo === "hombre" ? 10 * p + 6.25 * a - 5 * e + 5 : 10 * p + 6.25 * a - 5 * e - 161;
    const actividad = parseFloat(usuario.actividad);
    const gastoDiario = Math.round(tbm * actividad);
    const definicion = Math.round(gastoDiario * 0.8);
    const volumen = Math.round(gastoDiario * 1.15);
  
    return (
      <div className="calorie-info">
        <h3>Calorías estimadas:</h3>
        <p>Gasto: Diario {gastoDiario} kcal / Semanal {gastoDiario * 7} kcal</p>
        <p>Definición: {definicion} kcal / Semanal {definicion * 7} kcal</p>
        <p>Volumen: {volumen} kcal / Semanal {volumen * 7} kcal</p>
      </div>
    );
  }
  