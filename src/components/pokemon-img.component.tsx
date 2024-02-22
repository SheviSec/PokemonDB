import { Pokemon } from "@/types/pokemon.type";

type PokemonImg = {
  url: string | null;
};

export const PokemonImg = ({ url }: PokemonImg) => {
  return <img src={url ?? ""}></img>;
};
