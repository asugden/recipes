import _ from "lodash";
import IDrinkIng from "../db/interfaces/IDrinkIng";

var typeOrder = [
  "spirit",
  "liqueur",
  "amaro",
  "brewed",
  "drink",
  "juice",
  "syrup",
  "bitters",
  "garnish",
];

export const ingredientSort = (a: IDrinkIng, b: IDrinkIng) => {
  if (a.type !== b.type && a.type === "garnish") {
    return 1;
  } else if (a.type !== b.type && b.type === "garnish") {
    return -1;
  } else if (a.type !== b.type && a.type === "bitters") {
    return 1;
  } else if (a.type !== b.type && b.type === "bitters") {
    return -1;
  } else if (a.type !== b.type && a.type === "juice") {
    return 1;
  } else if (a.type !== b.type && b.type === "juice") {
    return 1;
  } else if (a.volume !== b.volume) {
    return a.volume > b.volume ? -1 : 1;
  } else if (a.type !== b.type) {
    return _.indexOf(typeOrder, a.type) < _.indexOf(typeOrder, b.type) ? -1 : 1;
  } else {
    return a.name.localeCompare(b.name);
  }
};
