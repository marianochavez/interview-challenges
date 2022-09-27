import type {Pokemon} from "./types";

import {memo} from "react";

import {CartItem} from "./App";

type PokemonCardProps = {
  pokemon: Pokemon;
  cart: Record<Pokemon["id"], CartItem>;
  onAdd: (pokemon: Pokemon) => void;
  onDecrement: (pokemon: Pokemon) => void;
};

export default memo(
  function PokemonCard({pokemon, cart, onAdd, onDecrement}: PokemonCardProps) {
    return (
      <article key={pokemon.id}>
        <img className="nes-container" src={pokemon.image} />
        <div>
          <p>{pokemon.name}</p>
          <p>{pokemon.description}</p>
        </div>
        {cart[pokemon.id] ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "baseline",
              marginBottom: 0,
              flex: 1,
            }}
          >
            <button
              className="nes-btn"
              style={{padding: "5px"}}
              onClick={() => onDecrement(pokemon)}
            >
              -
            </button>
            <p className="nes-text">{cart[pokemon.id].quantity}</p>
            <button className="nes-btn" style={{padding: "5px"}} onClick={() => onAdd(pokemon)}>
              +
            </button>
          </div>
        ) : (
          <button className="nes-btn" onClick={() => onAdd(pokemon)}>
            Agregar
          </button>
        )}
      </article>
    );
  },
  (prevProps, nextProps) =>
    prevProps.cart[prevProps.pokemon.id]?.quantity ===
    nextProps.cart[nextProps.pokemon.id]?.quantity,
);
