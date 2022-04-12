import {useEffect, useState} from "react";

import api from "./api";
import {Product} from "./types";
import {
  ProductCard,
  ProductBadge,
  ProductButton,
  ProductDescription,
  ProductImage,
  ProductTitle,
} from "./components";
import {useProductCart} from "./hooks/useProductCart";
import {CartModal} from "./components/CartModal";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const {cart, onProductQuantityChange} = useProductCart();

  useEffect(() => {
    api.list().then(setProducts);
  }, []);

  return (
    <main>
      <header>Estampitiency</header>
      <section>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            value={cart[product.id]?.quantity || 0}
            onChange={onProductQuantityChange}
          >
            <ProductImage image={product.image} />
            <ProductBadge color="teal" text="new" />
            <ProductTitle title={product.title} />
            <ProductDescription text={product.description || ""} />
            <ProductButton />
          </ProductCard>
        ))}
      </section>
      <CartModal cart={cart} />
      <footer>
        Encontrá la consigna de este ejercicio y otros más{" "}
        <a href="https://github.com/goncy/interview-challenges/tree/main/simple-cart">acá</a>
      </footer>
    </main>
  );
}

export default App;
