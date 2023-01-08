import IDrinkIngredient from "./IDrinkIngredient";
import IUnits from "./IUnits";

export default interface IDrinkRecipeIngredient {
  id: number;
  volume: number;
  unit_id: IUnits;
  drink_ingredient_id: IDrinkIngredient;
}
