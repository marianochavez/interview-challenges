import {Button, Image, Box, Text} from "@chakra-ui/react";
import {Table, Thead, Tbody, Tr, Th, Td, TableContainer} from "@chakra-ui/react";
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import {AiOutlineShoppingCart} from "react-icons/ai";

import {ProductInCart} from "../types";

interface Props {
  cart: {
    [key: string]: ProductInCart;
  };
}

export const CartModal = ({cart}: Props) => {
  const {isOpen, onOpen, onClose} = useDisclosure();

  const cartCount = Object.keys(cart).reduce((count, key) => {
    return count + cart[key].quantity;
  }, 0);

  const cartTotal = Object.keys(cart).reduce((total, key) => {
    return total + cart[key].price * cart[key].quantity;
  }, 0);

  return (
    <>
      <Button
        borderRadius="full"
        colorScheme="red"
        leftIcon={<AiOutlineShoppingCart />}
        margin="auto"
        position="fixed"
        right="50px"
        top="10px"
        zIndex="999"
        onClick={onOpen}
      >
        Carrito {!!cartCount && <span>&nbsp;({cartCount})</span>}
      </Button>

      <Modal isOpen={isOpen} size="full" onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Carrito</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {Object.keys(cart).length === 0 ? (
              <Box fontSize="lg" fontWeight="semibold" textAlign="center">
                No hay productos en el carrito.
              </Box>
            ) : (
              <TableContainer>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th />
                      <Th>Producto</Th>
                      <Th isNumeric>Cantidad</Th>
                      <Th isNumeric>Precio</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {Object.keys(cart).length !== 0 &&
                      Object.keys(cart).map((key) => (
                        <Tr key={key}>
                          <Td>{<Image src={cart[key].image} w="60px" />}</Td>
                          <Td>{cart[key].title}</Td>
                          <Td isNumeric>{cart[key].quantity}</Td>
                          <Td isNumeric>{`$ ${cart[key].price * cart[key].quantity}`}</Td>
                        </Tr>
                      ))}
                  </Tbody>
                </Table>
              </TableContainer>
            )}
          </ModalBody>
          <ModalFooter>
            <Text color="black" flex={1} fontWeight="semibold">
              Total: ${cartTotal.toFixed(2)}
            </Text>
            <Button colorScheme="orange" mr={3} variant="outline" onClick={onClose}>
              Cerrar
            </Button>
            <Button colorScheme="green">Pagar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
