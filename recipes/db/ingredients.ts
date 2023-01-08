import axios, { AxiosError } from "axios";
import IItem from "./interfaces/IItem";

const getIngredients = async (ingredientType: string): Promise<IItem[]> => {
  try {
    const data = await axios.get("/api/ingredients", {
      params: { type: ingredientType },
    });

    let out = data.data.ingredients as IItem[];
    out.sort((a, b) => a.name.localeCompare(b.name));
    return out;
  } catch (error) {
    let out = {} as IItem[];
    const parsed = error as AxiosError;
    console.log("ERROR", parsed.code);
    return out;
  }
};

export default getIngredients;
