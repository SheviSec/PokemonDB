import { usePokemon } from "@/hooks/use-pokemon.hook";
import { Card, CardContent, CardHeader } from "@mui/material";
import { PokemonTable } from "./pokemon-table.component";

type Pokemonlist = {};

export const PokemonList = ({}: Pokemonlist) => {
  const { pokemonList, isLoading } = usePokemon();

  const pokemonListResults = pokemonList;

  return (
    <Card sx={{ height: "100%" }}>
      <CardHeader title={"Pokemon DB"} />
      <CardContent>
        <PokemonTable isLoading={isLoading} pokemonList={pokemonListResults} />
      </CardContent>
    </Card>
  );
};
