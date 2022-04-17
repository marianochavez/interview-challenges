import type {Product} from "./types";

import {memo, useEffect, useState} from "react";

import api from "./api";

const Recommended = memo(function Recommended() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    api.search().then(setProducts);
  }, []);

  return (
    <main>
      <h1>Productos recomendados</h1>
      <ul>
        {[...products]
          .sort(() => (Math.random() > 0.5 ? 1 : -1))
          .slice(0, 2)
          .map((product) => (
            <li key={product.id}>
              <h4>{product.title}</h4>
              <p>{product.description}</p>
              <span>$ {product.price}</span>
            </li>
          ))}
      </ul>
    </main>
  );
});

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState<string>("");
  const [favProducts, setFavProducts] = useState<Product[]>([]);

  useEffect(() => {
    const favProductsStorage = localStorage.getItem("favProd");

    if (favProductsStorage) setFavProducts(JSON.parse(favProductsStorage));
  }, [setFavProducts]);

  useEffect(() => {
    localStorage.setItem("favProd", JSON.stringify(favProducts));
  }, [favProducts]);

  useEffect(() => {
    api.search(query).then(setProducts);
  }, [query]);

  const handleFav = (product: Product) => {
    if (favProducts.includes(product))
      return setFavProducts(favProducts.filter((prod) => (prod.id === product.id ? null : prod)));
    setFavProducts([...favProducts, product]);
  };

  return (
    <main>
      <h1>Tienda digitaloncy</h1>
      <input name="text" placeholder="tv" type="text" onChange={(e) => setQuery(e.target.value)} />
      <ul>
        {products.map((product) => (
          <li
            key={product.id}
            className={`${favProducts.includes(product) && "fav"}`}
            onClick={() => handleFav(product)}
          >
            <h4>{product.title}</h4>
            <p>{product.description}</p>
            <span>$ {product.price}</span>
          </li>
        ))}
      </ul>
      <hr />
      <Recommended />
    </main>
  );
}

export default App;
