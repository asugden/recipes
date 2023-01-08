import _ from "lodash";
import IItem from "../db/interfaces/IItem";

var typeOrder = ["nick and nora", "rocks", "wine", "highball"];

export const glassesSort = (a: IItem, b: IItem) => {
  return _.indexOf(typeOrder, a.name) < _.indexOf(typeOrder, b.name) ? -1 : 1;
};
