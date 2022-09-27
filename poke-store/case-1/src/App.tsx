import type {Pokemon} from "./types";

import {useMemo, useState} from "react";

import {POKEMONS} from "./constants";

function App() {
  const [cart, setCart] = useState<Pokemon[]>([]);
  const [total, setTotal] = useState(0);
  const [searchItem, setSearchItem] = useState<Pokemon["name"]>("");
  const [favorites, setFavorites] = useState<Record<Pokemon["id"], Pokemon>>(() => {
    const storedFav = localStorage.getItem("favorites");

    return storedFav ? JSON.parse(storedFav) : {};
  });
  const filteredPokemons = useMemo(() => {
    return POKEMONS.filter((pokemon) =>
      searchItem ? pokemon.name.toLowerCase().includes(searchItem.toLowerCase()) : true,
    );
  }, [searchItem]);

  const handleAddItem = (pokemon: Pokemon) => {
    if (total >= 10) return;
    setCart((cart) => cart.concat(pokemon));
    setTotal((total) => (total += pokemon.price));
  };

  function handleFavorites(pokemon: Pokemon) {
    const draft = structuredClone(favorites);

    if (favorites[pokemon.id]) {
      delete draft[pokemon.id];
    } else {
      draft[pokemon.id] = pokemon;
    }
    setFavorites(draft);
    localStorage.setItem("favorites", JSON.stringify(draft));
  }

  return (
    <>
      <nav>
        <input
          className="nes-input"
          id="name_field"
          placeholder="Charmander"
          type="text"
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
        />
      </nav>
      <section>
        {filteredPokemons.map((pokemon) => (
          <article key={pokemon.id}>
            <figure>
              <i
                className={`nes-icon is-medium heart ${
                  favorites[pokemon.id] ? "" : "is-transparent"
                }`}
                style={{zIndex: 9}}
                onClick={() => handleFavorites(pokemon)}
              />

              <img className="nes-container" src={pokemon.image} />
            </figure>
            <div>
              <p>
                {pokemon.name} (${pokemon.price})
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
        <button className="nes-btn is-primary">
          {cart.length} items (total ${total})
        </button>
      </aside>
    </>
  );
}

export default App;
