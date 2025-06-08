function añadirComidaADia(setWeekMeals, comida, dia, tipo) {
    const nueva = {
      ...comida,
      uid: `${comida.id}-${Date.now()}-${Math.random()}`,
      grams: 100,
    };
  
    setWeekMeals(prev => {
      const copia = { ...prev };
  
      // Asegurar estructura
      if (!copia[dia]) copia[dia] = {};
      if (!copia[dia][tipo]) copia[dia][tipo] = [];
  
      // Comprobar si ya existe
      const yaExiste = copia[dia][tipo].some(item => item.id === comida.id);
      if (yaExiste) {
        console.log("Ya existe una comida de este tipo en este día");
        return prev;
      }
  
      // Agregar comida
      copia[dia][tipo] = [...copia[dia][tipo], nueva];
      return copia;
    });
  }
export default añadirComidaADia;  