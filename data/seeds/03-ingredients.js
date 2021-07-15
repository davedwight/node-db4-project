exports.seed = function (knex) {
  return knex("ingredients").insert([
    { ingredient_name: "Egg" },
    { ingredient_name: "Milk" },
    { ingredient_name: "Chicken" },
  ]);
};
