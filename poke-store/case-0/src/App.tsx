import React, {useEffect, useState} from "react";

import api from "./api";
import {Pokemon} from "./types";

type CartItem = {
  pokemon: Pokemon;
  quantity: number;
};

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [cart, setCart] = useState<Map<Pokemon["id"], CartItem>>(
    () => new Map<Pokemon["id"], CartItem>(),
  );
  const [cartQuantity, setCartQuantity] = useState(0);

  useEffect(() => {
    api.list().then(setPokemons);
  }, []);

  function handleAddItem(pokemon: Pokemon) {
    const draft: Map<Pokemon["id"], CartItem> = structuredClone(cart);

    const item = draft.get(pokemon.id);

    if (item) {
      if (item.quantity < 3) {
        item.quantity += 1;
        setCartQuantity((prevQuantity) => prevQuantity + 1);
      }
    } else {
      draft.set(pokemon.id, {pokemon, quantity: 1});
      setCartQuantity((prevQuantity) => prevQuantity + 1);
    }
    setCart(draft);
  }

  if (pokemons.length === 0) {
    return (
      <h1
        className="nes-text is-primary"
        style={{display: "flex", alignItems: "center", justifyContent: "center", height: "90vh"}}
      >
        Cargando...
      </h1>
    );
  }

  return (
    <>
      <section>
        {pokemons.map((pokemon) => (
          <article key={pokemon.id}>
            <img className="nes-container" src={pokemon.image} />
            <div>
              <p>
                {pokemon.name} <span>${pokemon.price}</span>
              </p>
              <p>{pokemon.description}</p>
            </div>
            <button className="nes-btn" onClick={() => handleAddItem(pokemon)}>
              Agregar
            </button>
          </article>
        ))}
      </section>
      <aside>
        <button className="nes-btn is-primary">{cartQuantity} items</button>
      </aside>
    </>
  );
}

export default App;
