import {Text} from "@chakra-ui/react";
import {useContext} from "react";

import {ProductContext} from "./ProductCard";

interface Props {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export const ProductDescription = ({text, className, style}: Props) => {
  const {product} = useContext(ProductContext);

  return (
    <Text className={`${className}`} color="gray.600" mt={1} paddingLeft={3} style={style}>
      {text ? text : product.title}
    </Text>
  );
};
