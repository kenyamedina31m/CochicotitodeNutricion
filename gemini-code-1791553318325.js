document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("nutrition-form");
  const resultsContainer = document.getElementById("results");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Obtener valores del formulario
    const gender = document.getElementById("gender").value;
    const age = parseInt(document.getElementById("age").value);
    const weight = parseFloat(document.getElementById("weight").value);
    const height = parseFloat(document.getElementById("height").value);
    const activity = parseFloat(document.getElementById("activity").value);
    const goal = document.getElementById("goal").value;

    // 1. Cálculo del IMC
    const heightInMeters = height / 100;
    const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);

    // 2. Cálculo de Tasa Metabólica Basal (Ecuación Mifflin-St Jeor)
    let bmr = 0;
    if (gender === "male") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    // 3. Gastos calóricos según actividad física
    let tdee = bmr * activity;

    // Ajuste según el objetivo
    let targetCalories = tdee;
    if (goal === "deficit") {
      targetCalories -= 400; // Déficit moderado
    } else if (goal === "surplus") {
      targetCalories += 300; // Superávit moderado
    }

    // 4. Distribución estimada de macronutrientes
    // Proteína: ~1.8g/kg | Grasas: ~28% de calorías | Carbohidratos: Resto
    const proteinGrams = Math.round(weight * 1.8);
    const fatGrams = Math.round((targetCalories * 0.28) / 9);
    const carbGrams = Math.round((targetCalories - (proteinGrams * 4) - (fatGrams * 9)) / 4);

    // 5. Cálculo de porciones de alimentos recomendadas por día
    const proteinPortions = Math.max(3, Math.round(proteinGrams / 22));
    const carbPortions = Math.max(2, Math.round(carbGrams / 25));
    const vegPortions = targetCalories > 2200 ? 5 : 4;
    const fruitPortions = 3;
    const fatPortions = Math.max(2, Math.round(fatGrams / 10));
    const dairyPortions = 2;

    // Renderizar métricas en el DOM
    document.getElementById("res-tbm").textContent = Math.round(bmr);
    document.getElementById("res-calories").textContent = Math.round(targetCalories);
    document.getElementById("res-bmi").textContent = bmi;

    document.getElementById("res-protein").textContent = proteinGrams;
    document.getElementById("res-carbs").textContent = carbGrams;
    document.getElementById("res-fats").textContent = fatGrams;

    document.getElementById("portion-protein").textContent = `${proteinPortions} porciones`;
    document.getElementById("portion-carbs").textContent = `${carbPortions} porciones`;
    document.getElementById("portion-veg").textContent = `${vegPortions} porciones`;
    document.getElementById("portion-fruits").textContent = `${fruitPortions} porciones`;
    document.getElementById("portion-fats").textContent = `${fatPortions} porciones`;
    document.getElementById("portion-dairy").textContent = `${dairyPortions} porciones`;

    // Mostrar contenedor de resultados
    resultsContainer.classList.remove("hidden");
    resultsContainer.scrollIntoView({ behavior: "smooth" });
  });
});