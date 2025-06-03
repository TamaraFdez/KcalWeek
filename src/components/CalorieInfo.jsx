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
        <p><strong>Definición:</strong> <br /><span>Diario</span> {definicion} kcal / <span>Semanal</span> {definicion * 7} kcal</p>
        <p><strong>Mantenimiento:</strong> <br /><span>Diario</span> {gastoDiario} kcal / <span>Semanal</span> {gastoDiario * 7} kcal</p>
        <p> <strong>Volumen:</strong> <br /><span>Diario</span> {volumen} kcal / <span>Semanal</span> {volumen * 7} kcal</p>
      </div>
    );
  }
  