import IDrinkCategory from "./IDrinkCategory";
import IDrinkIng from "./IDrinkIng";
import IDrinkRecipeIngredient from "./IDrinkRecipeIngredient";
import IGlass from "./IGlass";

export default interface IDrinkRecipe {
  id: number;
  name: string;
  stirred?: boolean;
  source?: string;
  glass_id?: IGlass;
  description?: string;
  rating: number;
  drink_category_id: IDrinkCategory;
  created_at: string;
  recipe?: IDrinkRecipeIngredient[];
  ingredients?: IDrinkIng[];
}
