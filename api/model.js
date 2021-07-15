const db = require("../data/db-config");

function getRecipeById(id) {
  return db("recipes as r").where("recipe_id", id);
}

module.exports = {
  getRecipeById,
};
