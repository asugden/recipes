import axios, { AxiosError } from "axios";
import { fractional } from "../src/fractional";
import { ingredientSort } from "../src/ingredientSort";
import IDrinkIng from "./interfaces/IDrinkIng";
import IDrinkRecipe from "./interfaces/IDrinkRecipe";
import IDrinkRecipeIngredient from "./interfaces/IDrinkRecipeIngredient";
import IDrinkRecipeString from "./interfaces/IDrinkRecipeString";

// import exampleData from './example.json';
// axios.interceptors.request.use((request) => {
//   console.log('Starting Request', JSON.stringify(request, null, 2));
//   return request;
// });
const getDrinks = async (): Promise<IDrinkRecipe[]> => {
  try {
    const data = await axios.get("/api/drinks");

    const out = data.data.drinks.map((rawRecipe: IDrinkRecipe) => {
      let { recipe, ...rec } = rawRecipe;
      if (recipe) {
        rec.ingredients = recipe
          .map((recipeIngredient: IDrinkRecipeIngredient) => {
            return {
              volume: recipeIngredient.volume,
              fractionalVolume: fractional(recipeIngredient.volume),
              units: recipeIngredient.unit_id.abbrev,
              name: recipeIngredient.drink_ingredient_id.name,
              type: recipeIngredient.drink_ingredient_id.ingredient_type_id
                .name,
            } as IDrinkIng;
          })
          .sort(ingredientSort);
      }

      return rec;
    });

    return out;
  } catch (error) {
    let out = {} as IDrinkRecipe[];
    const parsed = error as AxiosError;
    console.log("ERROR", parsed.code);
    return out;
  }
};

export default getDrinks;

export const postDrinks = async (drink: IDrinkRecipeString) => {
  try {
    await axios.post("/api/drinks", {
      recipe: drink,
    });
  } catch (error) {
    let out = {} as IDrinkRecipe[];
    const parsed = error as AxiosError;
    console.log("ERROR", parsed.code);
    return out;
  }
};
