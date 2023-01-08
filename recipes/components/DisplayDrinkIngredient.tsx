import { GridItem, GridItemProps, Text } from "@chakra-ui/react";
import _ from "lodash";
import React from "react";
import IDrinkIng from "../db/interfaces/IDrinkIng";

interface Props extends GridItemProps {
  ingredient: IDrinkIng;
}

const DisplayDrinkIngredient = ({
  ingredient,
  ...props
}: Props): JSX.Element => {
  const formattedUnit =
    ingredient.units === "count" ? "" : ` ${ingredient.units}`;

  return (
    <GridItem height="34px">
      <Text fontWeight="bold" width="70px" as="span" display="inline-block">
        <span
          dangerouslySetInnerHTML={{
            __html: ingredient.fractionalVolume + formattedUnit,
          }}
        />
      </Text>
      <Text as="span">{" " + _.startCase(_.toLower(ingredient.name))}</Text>
    </GridItem>
  );
};

export default React.memo(DisplayDrinkIngredient);
