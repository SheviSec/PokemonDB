import { PokemonSprites } from "./pokemon-prites.type";

interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export type Pokemon = {
  id: number;
  name: string;
  height: number; // Height of the Pokémon in decimetres
  weight: number; // Weight of the Pokémon in hectograms
  types: PokemonType[];
  abilities: PokemonAbility[];
  sprites: PokemonSprites;
};
