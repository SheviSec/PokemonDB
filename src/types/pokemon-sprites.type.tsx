export type PokemonSprites = {
  back_default: string;
  back_female: string | null;
  back_shiny: string;
  back_shiny_female: string | null;
  front_default: string;
  front_female: string | null;
  front_shiny: string;
  front_shiny_female: string | null;
  other: {
    dream_world: {
      front_default: string;
      front_female: string | null;
    };
    home: {
      front_default: string;
      front_female: string;
      front_shiny: string;
      front_shiny_female: string;
    };
    ["official-artwork"]: {
      front_default: string;
      front_shiny: string;
    };
    showdown: {
      back_default: string;
      back_female: string | null;
      back_shiny: string;
      back_shiny_female: string | null;
      front_default: string;
      front_female: string;
      front_shiny: string;
      front_shiny_female: string;
    };
  };
  versions: {
    [key: string]: {
      [key: string]: {
        back_default: string;
        back_female?: string;
        back_gray?: string;
        back_shiny?: string;
        back_shiny_female?: string;
        back_transparent?: string;
        front_default: string;
        front_female?: string;
        front_gray?: string;
        front_shiny?: string;
        front_shiny_female?: string;
        front_transparent?: string;
      };
    };
  };
};
