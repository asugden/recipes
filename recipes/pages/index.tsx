import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Grid,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useQuery, useQueryClient } from "react-query";
import DrinkRecipe from "../components/DrinkRecipe";
import NewDrink from "../components/NewDrink";
import getDrinks from "../db/drinks";
import IDrinkRecipe from "../db/interfaces/IDrinkRecipe";

const Home = () => {
  const { isOpen, onOpen, onClose: onCloseModal } = useDisclosure();
  const { data, status } = useQuery(["drinks"], () => getDrinks(), {
    staleTime: 1000 * 60 * 15,
  });
  const queryClient = useQueryClient();

  const onClose = async () => {
    await queryClient.invalidateQueries({ queryKey: ["drinks"] });
    onCloseModal();
  };

  return (
    <>
      <IconButton
        aria-label="New Drink"
        icon={<AddIcon boxSize={6} />}
        position="fixed"
        top="10px"
        right="10px"
        onClick={onOpen}
        _hover={{ bg: "black", color: "white" }}
        zIndex={100}
      />
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

      <Box className="container" style={{ padding: "50px 0 50px 0" }}>
        <Center>
          <Grid
            padding="20px"
            minWidth={{ base: "300px", sm: "300px", md: "500px", lg: "700px" }}
            border="1px solid black"
            borderRadius="30px"
          >
            {status === "success" &&
              data &&
              data.map((recipe: IDrinkRecipe, idx: number) => (
                <DrinkRecipe
                  recipe={recipe}
                  idx={idx}
                  key={idx}
                  selectFn={() => {}}
                />
              ))}
          </Grid>
        </Center>
      </Box>
    </>
  );
};

export default Home;
