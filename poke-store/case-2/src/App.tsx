import type {Pokemon} from "./types";

import {useCallback, useEffect, useRef, useState} from "react";

import {POKEMONS} from "./constants";
import PokemonCard from "./PokemonCard";

export type CartItem = {
  pokemon: Pokemon;
  quantity: number;
};

function App() {
  const [cart, setCart] = useState<Record<Pokemon["id"], CartItem>>(() => {
    const storedCart = localStorage.getItem("cart");

    return storedCart ? JSON.parse(storedCart) : {};
  });
  const [total, setTotal] = useState(() => {
    return Object.values(cart).reduce((p, c: CartItem) => p + c.quantity, 0);
  });
  const cartRef = useRef(cart);

  useEffect(() => {
    cartRef.current = cart;
  }, [cart]);

  const handleIncrementItem = useCallback((pokemon: Pokemon) => {
    const draft: Record<Pokemon["id"], CartItem> = structuredClone(cartRef.current);

    if (draft[pokemon.id]) {
      draft[pokemon.id].quantity += 1;
    } else {
      draft[pokemon.id] = {pokemon, quantity: 1};
    }

    setTotal((prevTotal) => prevTotal + 1);
    setCart(draft);
    localStorage.setItem("cart", JSON.stringify(draft));
  }, []);

  const handleDecrementItem = useCallback((pokemon: Pokemon) => {
    const draft: Record<Pokemon["id"], CartItem> = structuredClone(cartRef.current);

    if (draft[pokemon.id].quantity > 1) {
      draft[pokemon.id].quantity -= 1;
    } else {
      delete draft[pokemon.id];
    }
    setTotal((prevTotal) => prevTotal - 1);
    setCart(draft);
    localStorage.setItem("cart", JSON.stringify(draft));
  }, []);

  return (
    <>
      <nav>
        <input className="nes-input" id="name_field" placeholder="Charmander" type="text" />
      </nav>
      <section>
        {POKEMONS.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            cart={cart}
            pokemon={pokemon}
            onAdd={handleIncrementItem}
            onDecrement={handleDecrementItem}
          />
        ))}
      </section>
      <aside>
        <button className="nes-btn is-primary">
          {total} items (total $
          {Object.values(cart).reduce((p, c) => p + c.pokemon.price * c.quantity, 0)})
        </button>
      </aside>
    </>
  );
}

export default App;
