import {
  Box,
  Flex,
  GridItem,
  GridItemProps,
  LinkBox,
  LinkOverlay,
  Text,
} from "@chakra-ui/react";
import React from "react";
import IDrinkIng from "../db/interfaces/IDrinkIng";
import IDrinkRecipe from "../db/interfaces/IDrinkRecipe";
import DrinkIngredient from "./DrinkIngredient";

interface Props extends GridItemProps {
  recipe: IDrinkRecipe;
  idx: number;
  selectFn: (arg0: number) => void;
}

// const computeAuthorWidth = (name: string): number => {};

const DrinkRecipe = ({
  recipe,
  selectFn,
  idx,
  ...props
}: Props): JSX.Element => {
  return (
    <GridItem
      maxW="80ch"
      borderBottom="0.5px solid black"
      paddingBottom="0.2em"
      paddingTop="1em"
      idx={idx}
      key={idx}
      {...props}
      _hover={{ bg: "#EFEFEF" }}
    >
      <LinkBox>
        <Box w="100%" h="100%" role="group">
          <Flex flexDirection="row">
            <Box flex={1}>
              <Flex>
                <LinkOverlay onClick={() => selectFn(idx)}>
                  <Text
                    fontFamily="heading"
                    fontSize="1rem"
                    fontWeight="700"
                    textTransform="uppercase"
                  >
                    {recipe.name}
                  </Text>
                </LinkOverlay>
              </Flex>
              <Text
                overflow="ellipsis"
                fontFamily="body"
                fontSize="0.9rem"
                fontWeight="normal"
              >
                {recipe.description}
              </Text>
              <Box fontFamily="heading" fontSize="0.8rem">
                {recipe.ingredients &&
                  recipe.ingredients.map(
                    (ingredient: IDrinkIng, idx: number) => (
                      <DrinkIngredient ingredient={ingredient} key={idx} />
                    )
                  )}
              </Box>
            </Box>
          </Flex>
        </Box>
      </LinkBox>
    </GridItem>
  );
};

export default React.memo(DrinkRecipe);
