import IDrinkRecipe from "../db/interfaces/IDrinkRecipe";

export const ingredientSort = (a: IDrinkRecipe, b: IDrinkRecipe) => {
  if (a.drink_category_id.id !== b.drink_category_id.id) {
    return a.drink_category_id.name.localeCompare(b.drink_category_id.name);
  } else {
    return a.name.localeCompare(b.name);
  }
};
