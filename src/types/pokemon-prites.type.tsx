export interface PokemonSprites {
  front_default: string | null;
  front_shiny: string | null;
  front_female: string | null;
  front_shiny_female: string | null;
  back_default: string | null;
  back_shiny: string | null;
  back_female: string | null;
  back_shiny_female: string | null;
  other?: {
    dream_world: {
      front_default: string | null;
      front_female: string | null;
    };
    "official-artwork": {
      front_default: string | null;
    };
    // Add other forms like "home" or any new ones introduced by the API here
  };
  versions?: {
    [version: string]: {
      // Example: 'generation-i', 'generation-viii', etc.
      [game: string]: {
        // Example: 'red-blue', 'sword-shield', etc.
        front_default: string | null;
        front_female: string | null;
        front_shiny: string | null;
        front_shiny_female: string | null;
        back_default: string | null;
        back_female: string | null;
        back_shiny: string | null;
        back_shiny_female: string | null;
        // Additional properties for specific games if available
      };
    };
  };
}
