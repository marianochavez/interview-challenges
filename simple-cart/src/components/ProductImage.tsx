import {Image} from "@chakra-ui/react";
import {useContext} from "react";

import {ProductContext} from "./ProductCard";

interface Props {
  image: string;
  className?: string;
  style?: React.CSSProperties;
  alt?: string;
}

export const ProductImage = ({image, alt, className, style}: Props) => {
  const {product} = useContext(ProductContext);

  return (
    <Image
      alt={`${alt ? alt : product.title}`}
      className={`${className}`}
      src={`${image ? image : product.image}`}
      style={style}
    />
  );
};
