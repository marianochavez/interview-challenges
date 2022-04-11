import pokemonApi from "../api";
import {Pokemon} from "../types";

export const getPokemon = async (): Promise<Pokemon> => {
  const res = await pokemonApi.random();

  const {id, name, image} = res;

  return {
    id,
    name,
    image,
  };
};
