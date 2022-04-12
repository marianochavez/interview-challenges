import {Box} from "@chakra-ui/react";
import {createContext, ReactElement} from "react";

import {useProduct} from "../hooks/useProduct";
import {onChangeArgs, Product, ProductContextProps} from "../types";

export const ProductContext = createContext({} as ProductContextProps);

const {Provider} = ProductContext;

export interface Props {
  product: Product;
  children?: ReactElement | ReactElement[];
  className?: string;
  style?: React.CSSProperties;
  onChange?: (args: onChangeArgs) => void;
  value?: number;
}

export const ProductCard = ({children, product, className, style, onChange, value}: Props) => {
  const {counter, increaseBy} = useProduct({product, onChange, value});

  return (
    <Provider value={{counter, increaseBy, product}}>
      <Box
        borderRadius="lg"
        borderWidth="1px"
        className={`${className}`}
        display="flex"
        flexDir={"column"}
        maxW="sm"
        overflow="hidden"
        style={style}
      >
        {children}
      </Box>
    </Provider>
  );
};
