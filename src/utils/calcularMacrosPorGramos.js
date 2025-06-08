function calcularMacrosPorGramos(item) {
    const factor = item.grams / 100;
    return {
      kcal: item.kcal * factor,
      protein: item.protein * factor,
      carbs: item.carbs * factor,
    };
  }
  export default calcularMacrosPorGramos;