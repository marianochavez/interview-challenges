import type {Product} from "./types";

import {useEffect, useState} from "react";

import api from "./api";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("none");

  useEffect(() => {
    const persistQuery = localStorage.getItem("query");

    if (persistQuery) setQuery(persistQuery);
  }, [setQuery]);

  useEffect(() => {
    const persistSortBy = localStorage.getItem("sortBy");

    if (persistSortBy) setSortBy(persistSortBy);
  }, [setSortBy]);

  useEffect(() => {
    localStorage.setItem("query", query);
    api.search(query).then(setProducts);
  }, [query]);

  useEffect(() => {
    localStorage.setItem("sortBy", sortBy);

    const element: HTMLSelectElement = document.getElementById("sortBy") as HTMLSelectElement;

    if (element) element.value = sortBy;
  }, [sortBy]);

  return (
    <main>
      <h1>Tienda digitaloncy</h1>
      <input
        name="text"
        placeholder="tv"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value.toLowerCase())}
      />
      <select id="sortBy" name="select" onChange={(e) => setSortBy(e.target.value)}>
        <option value="none">---Filtrar---</option>
        <option value="alphabetical">Alfabeticamente</option>
        <option value="priceAsc">Precio ascendente</option>
        <option value="priceDes">Precio descendente</option>
      </select>

      <ul>
        {products
          .sort((a, b) => {
            switch (sortBy) {
              case "alphabetical":
                return a.title > b.title ? 1 : -1;
              case "priceAsc":
                return a.price > b.price ? 1 : -1;
              case "priceDes":
                return a.price < b.price ? 1 : -1;
              default:
                return a.id - b.id;
            }
          })
          .map((product) => (
            <li key={product.id}>
              <h4>{product.title}</h4>
              <p>{product.description}</p>
              <span>$ {product.price.toLocaleString("es-AR")}</span>
            </li>
          ))}
      </ul>
    </main>
  );
}

export default App;
