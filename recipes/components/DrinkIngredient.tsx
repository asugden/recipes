import { Box, GridItemProps } from "@chakra-ui/react";
import _ from "lodash";
import React from "react";
import IDrinkIng from "../db/interfaces/IDrinkIng";

interface Props extends GridItemProps {
  ingredient: IDrinkIng;
}

const DrinkIngredient = ({ ingredient, ...props }: Props): JSX.Element => {
  const formattedUnit =
    ingredient.units === "count" ? "" : ` ${ingredient.units}`;

  return (
    <Box
      float="left"
      marginRight="10px"
      dangerouslySetInnerHTML={{
        __html:
          ingredient.fractionalVolume +
          formattedUnit +
          " " +
          _.startCase(_.toLower(ingredient.name)),
      }}
    ></Box>
  );
};

export default React.memo(DrinkIngredient);
