exports.seed = function (knex) {
  return knex("recipes").insert([
    { recipe_name: "Pancakes" },
    { recipe_name: "Chicken Parmesan" },
    { recipe_name: "Pizza" },
  ]);
};
