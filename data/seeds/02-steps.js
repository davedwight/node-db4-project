exports.seed = function (knex) {
  return knex("steps").insert([
    {
      step_number: 1,
      step_instructions: "Mix all dry ingredients",
      recipe_id: 1,
    },
    { step_number: 2, step_instructions: "Add egg and milk", recipe_id: 1 },
    {
      step_number: 1,
      step_instructions: "Mix together marinade ingredients",
      recipe_id: 2,
    },
  ]);
};
