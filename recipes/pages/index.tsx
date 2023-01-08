import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Flex,
  Grid,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import DisplayDrinkIngredient from "../components/DisplayDrinkIngredient";
import DrinkRecipe from "../components/DrinkRecipe";
import NewDrink from "../components/NewDrink";
import Selector from "../components/Selector";
import getCategories from "../db/categories";
import getDrinks from "../db/drinks";
import IDrinkIng from "../db/interfaces/IDrinkIng";
import IDrinkRecipe from "../db/interfaces/IDrinkRecipe";

const Home = () => {
  const [selectedRecipe, setSelectedRecipe] = useState<number | null>(null);
  const { isOpen, onOpen, onClose: onCloseModal } = useDisclosure();
  const {
    isOpen: isOpenDisplay,
    onOpen: onOpenDisplay,
    onClose: onCloseDisplay,
  } = useDisclosure();
  const { data, status } = useQuery(["drinks"], () => getDrinks(), {
    staleTime: 1000 * 60 * 15,
  });
  const [drinkCategory, setDrinkCategory] = useState("clean");
  const queryClient = useQueryClient();

  const onClose = async () => {
    await queryClient.invalidateQueries({ queryKey: ["drinks"] });
    onCloseModal();
  };

  return (
    <>
      <Box
        position="fixed"
        top={0}
        left={0}
        width="100%"
        height="70px"
        bg="white"
        borderBottom="4px solid black"
        padding="10px"
      >
        <Flex>
          <Box width="calc(100% - 70px)">
            <Selector
              group="categories"
              queryFn={getCategories}
              onChange={(e: any) => setDrinkCategory(e.target.value)}
            />
          </Box>
          <IconButton
            as="a"
            position="relative"
            aria-label="New Drink"
            icon={<AddIcon boxSize={6} />}
            onClick={onOpen}
            _hover={{ bg: "black", color: "white" }}
            border="1px solid black"
            bg="white"
            marginLeft="20px"
          />
        </Flex>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            textAlign="center"
            fontFamily="heading"
            textTransform="uppercase"
          >
            Add a drink
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <NewDrink closeModal={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenDisplay} onClose={onCloseDisplay}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            textAlign="center"
            fontFamily="body"
            // textTransform="uppercase"
            fontSize="1.8rem"
            borderBottom="1px solid black"
          >
            {data && selectedRecipe && data[selectedRecipe].name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody paddingTop="20px">
            <Grid fontFamily="heading" fontSize="1.1rem">
              {data &&
                selectedRecipe &&
                data[selectedRecipe].ingredients &&
                // @ts-ignore
                data[selectedRecipe].ingredients.map(
                  (ingredient: IDrinkIng, idx: number) => (
                    <DisplayDrinkIngredient ingredient={ingredient} key={idx} />
                  )
                )}
            </Grid>
            <Flex paddingTop="10px">
              <Text
                border="1px solid black"
                padding="4px"
                borderRadius="6px"
                bg={
                  data && selectedRecipe && data[selectedRecipe].stirred
                    ? "black"
                    : "white"
                }
                color={
                  data && selectedRecipe && data[selectedRecipe].stirred
                    ? "white"
                    : "black"
                }
                textTransform="uppercase"
                fontFamily="heading"
                fontWeight="medium"
              >
                {data && selectedRecipe && data[selectedRecipe].stirred
                  ? "Stirred"
                  : "Shaken"}
              </Text>
              <Spacer />
              <Text
                textAlign="right"
                border="1px solid black"
                padding="4px"
                borderRadius="6px"
                textTransform="uppercase"
                fontFamily="heading"
                fontWeight="medium"
              >
                {data &&
                  selectedRecipe &&
                  data[selectedRecipe].glass_id &&
                  // @ts-ignore
                  data[selectedRecipe].glass_id.name}
              </Text>
            </Flex>
            <Text opacity="0.6" paddingTop="20px">
              {data && selectedRecipe && data[selectedRecipe].description}
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Box className="container" style={{ padding: "90px 20px 20px 20px" }}>
        <Center>
          <Grid
            padding="20px"
            minWidth={{ base: "300px", sm: "300px", md: "500px", lg: "700px" }}
            border="1px solid black"
            borderRadius="30px"
          >
            <Center>
              <Image
                src={"/cocktails-" + drinkCategory + ".svg"}
                alt="Allref Logo"
                width="500px"
                marginTop="-30px"
              />
            </Center>
            {status === "success" &&
              data &&
              data.map(
                (recipe: IDrinkRecipe, idx: number) =>
                  drinkCategory === recipe.drink_category_id.name && (
                    <DrinkRecipe
                      recipe={recipe}
                      idx={idx}
                      key={idx}
                      selectFn={() => {
                        setSelectedRecipe(idx);
                        onOpenDisplay();
                      }}
                    />
                  )
              )}
            <Center>
              <Image
                src={"/cocktails-base.svg"}
                alt="Allref Logo"
                width="500px"
                marginTop="10px"
              />
            </Center>
          </Grid>
        </Center>
      </Box>
    </>
  );
};

export default Home;
