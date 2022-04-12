export interface Product {
  id: string;
  title: string;
  description?: string;
  image: string;
  price: number;
}

export interface ProductContextProps {
  counter: number;
  product: Product;
  increaseBy: (value: number) => void;
}

export interface ProductInCart extends Product {
  quantity: number;
}

export interface onChangeArgs {
  product: Product;
  quantity: number;
}
