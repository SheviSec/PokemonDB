import { PokemonAbility } from "./pokemon-abilities.type";
import { PokemonSprites } from "./pokemon-sprites.type";

interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export type Pokemon = {
  abilities: PokemonAbility[];
  base_experience: number;
  forms: {
    name: string;
    url: string;
  }[];
  height: number;
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: {
    move: {
      name: string;
      url: string;
    };
    version_group_details: {
      level_learned_at: number;
      move_learn_method: {
        name: string;
        url: string;
      };
      version_group: {
        name: string;
        url: string;
      };
    }[];
  }[];
  name: string;
  order: number;
  species: {
    name: string;
    url: string;
  };
  sprites: PokemonSprites;
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  weight: number;
};
