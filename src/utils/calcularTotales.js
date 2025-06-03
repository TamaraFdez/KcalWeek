function calcularTotales(comidas) {
    return comidas.reduce((acc, item) => {
      acc.kcal += (item.kcal * item.grams) / 100;
      acc.protein += (item.protein * item.grams) / 100;
      acc.carbs += (item.carbs * item.grams) / 100;
      return acc;
    }, { kcal: 0, protein: 0, carbs: 0 });
  }
  export default calcularTotales;