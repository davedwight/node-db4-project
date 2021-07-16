const db = require("../data/db-config");

async function getRecipeById(id) {
  const rows = await db("recipes as r")
    .leftJoin("steps as s", "r.recipe_id", "s.recipe_id")
    .leftJoin("step_ingredients as st", "s.step_id", "st.step_id")
    .leftJoin("ingredients as i", "st.ingredient_id", "i.ingredient_id")
    .select(
      "r.recipe_name",
      "s.step_number",
      "s.step_instructions",
      "i.ingredient_name",
      "st.ingredient_qty"
    )
    .where("r.recipe_id", id)
    .orderBy("s.step_number");

  const result = {
    recipe_name: rows[0].recipe_name,
    created_at: rows[0].created_at,
    steps: [],
  };

  rows.forEach((row) => {
    const stepsArr = [];
    result.steps.forEach((step) => {
      stepsArr.push(step.step_number);
    });
    if (!stepsArr.includes(row.step_number) && row.step_number) {
      result.steps.push({
        step_number: row.step_number,
        instructions: row.step_instructions,
        ingredients: [],
      });
    }
  });

  rows.forEach((row) => {
    if (row.ingredient_name) {
      const stepIndex = row.step_number - 1;
      result.steps[stepIndex].ingredients.push({
        ingredient_name: row.ingredient_name,
        ingredient_qty: row.ingredient_qty,
      });
    }
  });
  return result;
}

module.exports = {
  getRecipeById,
};
