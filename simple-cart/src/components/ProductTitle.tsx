import {Text} from "@chakra-ui/react";
import {useContext} from "react";

import {ProductContext} from "./ProductCard";

interface Props {
  title?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const ProductTitle = ({title, className, style}: Props) => {
  const {product} = useContext(ProductContext);

  return (
    <Text
      className={`${className}`}
      fontWeight="semibold"
      lineHeight="tight"
      mt={1}
      paddingLeft={3}
      style={style}
    >
      {title ? title : product.title}
    </Text>
  );
};
