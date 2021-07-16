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

  let result = {
    recipe_name: rows[0].recipe_name,
  };

  rows.forEach((row) => {
    if (row.step_number && !result.steps) {
      result = {
        ...result,
        steps: [],
      };
      result.steps.push({
        step_number: row.step_number,
        step_instructions: row.step_instructions,
      });
    } else if (row.step_number && result.steps) {
      result.steps.push({
        step_number: row.step_number,
        step_instructions: row.step_instructions,
      });
    }

    // if (row.step_number && row.ingredient_name) {
    //   result.steps.push({
    //     step_number: row.step_number,
    //     step_instructions: row.step_instructions,
    //     ingredients: [],
    //   });
    //   rows.forEach((row) => {
    //     result.steps.ingredients.push({
    //       ingredient_name: row.ingredient_name,
    //       ingredient_qty: row.ingredient_qty,
    //     });
    //   });
    // } else if (row.step_number) {
    //   result.steps.push({
    //     step_number: row.step_number,
    //     step_instructions: row.step_instructions,
    //   });
    // }
  });
  return result;
}

module.exports = {
  getRecipeById,
};
