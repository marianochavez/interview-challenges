/* eslint-disable @typescript-eslint/no-unused-vars */
import {useState} from "react";

import {ProductInCart, Product} from "../types";

export const useProductCart = () => {
  const [cart, setCart] = useState<{[key: string]: ProductInCart}>({});

  const onProductQuantityChange = ({quantity, product}: {quantity: number; product: Product}) => {
    setCart((oldCart) => {
      const productInCart: ProductInCart = oldCart[product.id] || {...product, quantity: 0};

      // agregar producto y cantidad
      if (Math.max(productInCart.quantity + quantity, 0) > 0) {
        productInCart.quantity += quantity;

        return {...oldCart, [product.id]: productInCart};
      }

      // borrar product
      const {[product.id]: toDelete, ...rest} = oldCart;

      return rest;
    });
  };

  return {
    cart,
    onProductQuantityChange,
  };
};
