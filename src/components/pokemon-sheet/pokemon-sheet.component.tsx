import { Pokemon } from "@/types/pokemon.type";
import { Box, Button, ClickAwayListener, Typography } from "@mui/material";
import { PokemonImg } from "../common/pokemon-img.component";

type PokemonSheetProps = {
  pokemon: Pokemon;
  onClose: () => void;
};

export const PokemonSheet = ({ pokemon, onClose }: PokemonSheetProps) => {
  return (
    <Box sx={{ width: "400px" }}>
      <Typography variant="h5" textTransform={"capitalize"}>
        {pokemon.name}
      </Typography>
      <PokemonImg
        url={pokemon.sprites.other?.["official-artwork"].front_default ?? ""}
        imgProps={{ style: { width: "100%" } }}
      />
      <PokemonImg
        url={pokemon.sprites.other?.["official-artwork"].front_shiny ?? ""}
        imgProps={{ style: { width: "100%" } }}
      />
      <PokemonImg
        url={pokemon.sprites.other.showdown.front_default ?? ""}
        imgProps={{ style: { width: "48px" } }}
      />
      <PokemonImg
        url={pokemon.sprites.other.showdown.front_shiny ?? ""}
        imgProps={{ style: { width: "48px" } }}
      />
      <PokemonImg
        url={pokemon.sprites.other.showdown.back_default ?? ""}
        imgProps={{ style: { width: "48px" } }}
      />

      <PokemonImg
        url={pokemon.sprites.other.home.front_default ?? ""}
        imgProps={{ style: { width: "100%" } }}
      />

      <PokemonImg
        url={pokemon.sprites.front_default ?? ""}
        imgProps={{ style: { width: "48px" } }}
      />
      <Button variant="contained" onClick={onClose}>
        Close
      </Button>
    </Box>
  );
};
