import {Box, Button, ButtonGroup} from "@chakra-ui/react";
import {useContext} from "react";

import {ProductContext} from "./ProductCard";

interface Props {
  className?: string;
  style?: React.CSSProperties;
}

export const ProductButton = ({className, style}: Props) => {
  const {counter, increaseBy} = useContext(ProductContext);

  return (
    <Box marginTop="auto" p={3}>
      {counter === 0 ? (
        <Button
          className={`${className}`}
          colorScheme="facebook"
          mt={1}
          paddingLeft={3}
          size="sm"
          style={style}
          onClick={() => increaseBy(1)}
        >
          Agregar
        </Button>
      ) : (
        <>
          <ButtonGroup isAttached size="sm" variant="outline">
            <Button colorScheme="red" onClick={() => increaseBy(-1)}>
              -
            </Button>
            <Button
              disabled
              _disabled={{
                borderColor: "none",
                borderTop: "1px solid",
                borderBottom: "1px solid",
              }}
              _hover={{
                cursor: "default",
              }}
            >
              {counter}
            </Button>
            <Button colorScheme="whatsapp" onClick={() => increaseBy(1)}>
              +
            </Button>
          </ButtonGroup>
        </>
      )}
    </Box>
  );
};
