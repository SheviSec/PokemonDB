import { usePokemon } from "@/hooks/use-pokemon.hook";
import { Card, CardContent, CardHeader } from "@mui/material";
import { PokemonTable } from "../pokemon-table/pokemon-table.component";
import { usePokemonFromDB } from "@/hooks/use-pokemon-from-db.hook";
import { usePokemonList } from "./use-pokemon-list.hook";

type Pokemonlist = {};

export const PokemonList = ({}: Pokemonlist) => {
  const {
    data,
    error,
    isLoading,
    changePaginationModel,
    paginationModel,
    totalItems,
  } = usePokemonList();

  const pokemonListResults = data?.items ?? [];

  return (
    <Card sx={{ height: "100%" }}>
      <CardHeader title={"Pokemon DB"} />
      <CardContent>
        <PokemonTable
          isLoading={isLoading}
          pokemonList={pokemonListResults}
          totalItems={totalItems}
          chagePaginationModel={changePaginationModel}
          paginationModel={paginationModel}
        />
      </CardContent>
    </Card>
  );
};
