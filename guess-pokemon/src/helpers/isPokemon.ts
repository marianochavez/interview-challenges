export const isPokemon = (pokemonName: String, nameRes: String): boolean => {
  const pokemon = pokemonName.replace(/\s/g, "").toLowerCase();
  const name = nameRes.replace(/\s/g, "").toLowerCase();

  return pokemon === name;
};
