import {useRef, useState, useEffect} from "react";

import {onChangeArgs, Product} from "../types";

interface UseProductArgs {
  product: Product;
  onChange?: (args: onChangeArgs) => void;
  value?: number;
}

export const useProduct = ({product, onChange, value = 0}: UseProductArgs) => {
  const [counter, setCounter] = useState(value);

  const isControlled = useRef(!!onChange);

  const increaseBy = (value: number) => {
    if (isControlled.current) {
      return onChange!({quantity: value, product});
    }
    const newValue = Math.max(counter + value, 0);

    setCounter(newValue);

    onChange && onChange({quantity: newValue, product});
  };

  useEffect(() => {
    setCounter(value);
  }, [value]);

  return {
    counter,
    increaseBy,
  };
};
