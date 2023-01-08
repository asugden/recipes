import ISendIngredient from "./ISendIngredient";

export default interface IDrinkRecipeString {
  name: string;
  stirred: number;
  source?: string | null;
  glass: string;
  description: string;
  rating: number;
  drink_type: string;
  ingredients: ISendIngredient[];
}
