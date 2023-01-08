import IIngredientType from "./IIngredientType";

export default interface IDrinkIngredient {
  id: number;
  name: string;
  abv: number;
  ingredient_type_id: IIngredientType;
}
