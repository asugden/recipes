import axios, { AxiosError } from "axios";
import { glassesSort } from "../src/glassesSort";
import IItem from "./interfaces/IItem";

const getGlasses = async (): Promise<IItem[]> => {
  try {
    const data = await axios.get("/api/glasses");
    const out = data.data.glasses.sort(glassesSort) as IItem[];
    return out;
  } catch (error) {
    let out = {} as IItem[];
    const parsed = error as AxiosError;
    console.log("ERROR", parsed.code);
    return out;
  }
};

export default getGlasses;
