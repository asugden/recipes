import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Select,
  Switch,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import _ from "lodash";
import { useState } from "react";
import getCategories from "../db/categories";
import { postDrinks } from "../db/drinks";
import getGlasses from "../db/glasses";
import getIngredients from "../db/ingredients";
import IDrinkRecipeString from "../db/interfaces/IDrinkRecipeString";
import ISendIngredient from "../db/interfaces/ISendIngredient";
import { fractional } from "../src/fractional";
import Selector from "./Selector";
import VolumeSlider from "./VolumeSlider";

interface Props {
  closeModal: () => void;
}

const NewDrink = ({ closeModal }: Props): JSX.Element => {
  const ingredientTypes = [
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

  const [ingredients, setIngredients] = useState<ISendIngredient[]>([]);
  const [activeItype, setItype] = useState<string>(ingredientTypes[0]);
  const [currentIngredient, setCurrentIngredient] = useState<string | null>(
    null
  );
  const [ingVolume, setVolume] = useState(1);

  const addIngredient = () => {
    if (currentIngredient && ingVolume > 0)
      setIngredients([
        ...ingredients,
        {
          type: activeItype,
          name: currentIngredient,
          volume: ingVolume,
          fractionalVolume: fractional(ingVolume),
        } as ISendIngredient,
      ]);
  };
  const [drinkName, setDrinkName] = useState<string | null>(null);
  const [drinkDescription, setDrinkDescription] = useState<string | null>(null);
  const [drinkCategory, setDrinkCategory] = useState<string>("clean");
  const [drinkGlass, setDrinkGlass] = useState<string>("nick and nora");
  const [drinkSource, setDrinkSource] = useState<string | null>(null);
  const [stirred, setStirred] = useState<boolean>(false);
  const [evaluating, setEvaluating] = useState<boolean>(true);

  const submitDrink = async () => {
    const newRecipe = {
      ingredients: ingredients,
      name: drinkName,
      description: drinkDescription,
      drink_type: drinkCategory,
      glass: drinkGlass,
      source: drinkSource,
      stirred: stirred ? 1 : 0,
      rating: evaluating ? 1 : 5,
    } as IDrinkRecipeString;

    await postDrinks(newRecipe);
    closeModal();
  };

  return (
    <Box w="100%" h="100%">
      <form>
        <Tabs isFitted>
          <TabList fontFamily="heading" fontWeight="500">
            <Tab>Ingredients</Tab>
            <Tab>Drink</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Grid>
                {ingredients.map((ing, idx) => {
                  return (
                    <GridItem key={idx}>
                      <Text fontFamily="heading">
                        {ing.type === "bitters" ? (
                          Math.round(ing.volume) + " dash "
                        ) : ing.type === "garnish" ? (
                          ""
                        ) : (
                          <span
                            dangerouslySetInnerHTML={{
                              __html: fractional(ing.volume) + " oz ",
                            }}
                          ></span>
                        )}
                        {_.capitalize(ing.name) +
                          (ing.type === "juice"
                            ? " juice"
                            : ing.type == "bitters"
                            ? " bitters"
                            : "")}
                      </Text>
                    </GridItem>
                  );
                })}
              </Grid>
              <FormControl>
                <FormLabel>Type</FormLabel>
                <Select
                  onChange={(e: any) => {
                    setItype(e.target.value);
                  }}
                >
                  {ingredientTypes.map((itype: string, idx: number) => (
                    <option value={itype} key={idx}>
                      {_.capitalize(itype)}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>{_.capitalize(activeItype)}</FormLabel>
                <Selector
                  group={activeItype}
                  queryFn={() => getIngredients(activeItype)}
                  selectDefault="Choose one"
                  onChange={(e: any) => {
                    setCurrentIngredient(e.target.value);
                  }}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Volume (oz)</FormLabel>
                <VolumeSlider
                  // @ts-ignore
                  setSliderVolume={setVolume}
                />
              </FormControl>

              <Button
                width="100%"
                fontFamily="heading"
                colorScheme="blue"
                marginTop="20px"
                as="a"
                onClick={addIngredient}
                disabled={currentIngredient === null ? true : false}
              >
                Add Ingredient
              </Button>
            </TabPanel>

            <TabPanel>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  type="name"
                  onChange={(e: any) => setDrinkName(e.target.value)}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Description</FormLabel>
                <Input
                  type="name"
                  onChange={(e: any) => setDrinkDescription(e.target.value)}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Category</FormLabel>
                <Selector
                  group="categories"
                  queryFn={getCategories}
                  onChange={(e: any) => setDrinkCategory(e.target.value)}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Glass</FormLabel>
                <Selector
                  group="glasses"
                  queryFn={getGlasses}
                  onChange={(e: any) => setDrinkGlass(e.target.value)}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Source</FormLabel>
                <Input
                  type="name"
                  onChange={(e: any) => setDrinkSource(e.target.value)}
                />
              </FormControl>

              <Flex>
                <FormControl flex={1}>
                  <FormLabel>Stirred</FormLabel>
                  <Switch
                    size="lg"
                    onChange={(e: any) => setStirred(e.target.value)}
                  />
                </FormControl>

                <FormControl flex={1}>
                  <FormLabel>Evaluating</FormLabel>
                  <Switch
                    size="lg"
                    defaultChecked={true}
                    onChange={(e: any) => setEvaluating(e.target.value)}
                  />
                </FormControl>
              </Flex>

              <FormControl marginTop="20px">
                <Button
                  width="100%"
                  fontFamily="heading"
                  colorScheme="blue"
                  onClick={submitDrink}
                >
                  Save
                </Button>
              </FormControl>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </form>
    </Box>
  );
};

export default NewDrink;
