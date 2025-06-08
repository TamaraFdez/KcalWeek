export default function CalorieInfo({ usuario }) {
  const p = parseFloat(usuario.peso);
  const a = parseFloat(usuario.altura);
  const e = parseInt(usuario.edad);
  const tbm =
    usuario.sexo === "hombre"
      ? 10 * p + 6.25 * a - 5 * e + 5
      : 10 * p + 6.25 * a - 5 * e - 161;
  const actividad = parseFloat(usuario.actividad);
  const gastoDiario = Math.round(tbm * actividad);
  const definicion = Math.round(gastoDiario * 0.8);
  const volumen = Math.round(gastoDiario * 1.15);
  const proteinasDefinicionMin = Math.round(p * 1.6);
  const proteinasDefinicionMax = Math.round(p * 2.6);
  const proteinasMantenimientoMin = Math.round(p * 0.8);
  const proteinasMantenimientoMax = Math.round(p * 2);
  const proteinasVolumenMin = Math.round(p * 1.6);
  const proteinasVolumenMax = Math.round(p * 2.2);
  const carbohidratosDefinicionMin = Math.round(p * 2);
  const carbohidratosDefinicionMax = Math.round(p * 4);
  const carbohidratosMantenimientoMin = Math.round(p * 5);
  const carbohidratosMantenimientoMax = Math.round(p * 7);
  const carbohidratosVolumenMin = Math.round(p * 4);
  const carbohidratosVolumenMax = Math.round(p * 7);

  return (
    <div className="calorie-info">
      <div
      style={{display: usuario.modo === "Definicion" ? "block" : "none"}}>
        <h5>
          <strong>Déficit:</strong>
        </h5>
        <span>Kcal: Diario</span> {definicion} kcal / <span>Semanal</span>{" "}
          {definicion * 7} kcal ||
        
        <span> Proteínas: Diario</span> {proteinasDefinicionMin}g-{proteinasDefinicionMax}g/ <span>Semanal</span>{" "} {proteinasDefinicionMin*7}g-{proteinasDefinicionMax*7}g ||
        
           <span> Carbohidratos: Diario</span> {carbohidratosDefinicionMin}g-{carbohidratosDefinicionMax}g / <span>Semanal</span>{" "}
          {carbohidratosDefinicionMin * 7}g-{carbohidratosDefinicionMax * 7}g
        
      </div>
      <div
      style={{display: usuario.modo === "Mantenimiento" ? "block" : "none"}}>
        <h5>
          <strong>Mantenimiento:</strong>
        </h5>
        
          <span>Kcal: Diario</span> {gastoDiario} kcal / <span>Semanal</span>{" "}
          {gastoDiario * 7} kcal
        
        <span>Proteínas: Diario</span> {proteinasMantenimientoMin}g-{proteinasMantenimientoMax}g/ <span>Semanal</span>{" "} {proteinasMantenimientoMin*7}g-{proteinasMantenimientoMax*7}g
        
          <span>Carbohidratos: Diario</span> {carbohidratosMantenimientoMin}g-{carbohidratosMantenimientoMax}g / <span>Semanal</span>{" "}
          {carbohidratosMantenimientoMin * 7}g-{carbohidratosMantenimientoMax * 7}g
        
      </div>
      <div
      style={{display: usuario.modo === "Volumen" ? "block" : "none"}}>
        <h5>
          <strong>Superávit: </strong>
        </h5>
        
          <span>Kcal: Diario</span> {volumen} kcal / <span>Semanal</span>{" "}
          {volumen * 7} kcal
        
        <span>Proteínas: Diario</span> {proteinasVolumenMin}g-{proteinasVolumenMax}g/ <span>Semanal</span>{" "} {proteinasVolumenMin*7}g-{proteinasVolumenMax*7}g
        
          <span>Carbohidratos: Diario</span> {carbohidratosVolumenMin}g-{carbohidratosVolumenMax}g / <span>Semanal</span>{" "}
          {carbohidratosVolumenMin * 7}g-{carbohidratosVolumenMax * 7}g
        
        </div>
      
    </div>
  );
}
