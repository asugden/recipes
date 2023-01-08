import axios, { AxiosError } from "axios";
import IItem from "./interfaces/IItem";

const getCategories = async (): Promise<IItem[]> => {
  try {
    const data = await axios.get("/api/categories");

    const out = data.data.categories as IItem[];
    return out;
  } catch (error) {
    let out = {} as IItem[];
    const parsed = error as AxiosError;
    console.log("ERROR", parsed.code);
    return out;
  }
};

export default getCategories;
