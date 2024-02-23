import { Pokemon } from "@/types/pokemon.type";
import {
  DataGrid,
  GridCallbackDetails,
  GridPaginationModel,
} from "@mui/x-data-grid";
import { POKEMON_TABLE_COLUMNS } from "./pokemon-table-columns.helper";
import { useState } from "react";
import { PokemonList } from "../pokemon-list.component";
import { PaginationModel } from "@/hooks/use-pokemon.hook";

type PokemonTableProps = {
  pokemonList: Pokemon[];
  isLoading: boolean;
  totalItems: number;
  paginationModel: PaginationModel;
  chagePaginationModel: (paginationModel: PaginationModel) => void;
};
export const PokemonTable = ({
  pokemonList,
  isLoading,
  totalItems,
  chagePaginationModel,
  paginationModel,
}: PokemonTableProps) => {
  const columns = POKEMON_TABLE_COLUMNS;

  const handleChangePage = (
    model: GridPaginationModel,
    details: GridCallbackDetails<any>
  ) => {
    chagePaginationModel(model);
  };

  console.log("PAGINATION:", paginationModel);
  return (
    <>
      {pokemonList && PokemonList.length > 0 && (
        <DataGrid
          autoPageSize
          autoHeight
          pagination
          pageSizeOptions={[20, 50, 100]}
          paginationMode="server"
          onPaginationModelChange={handleChangePage}
          paginationModel={paginationModel}
          loading={isLoading}
          columns={columns}
          rows={pokemonList}
          rowCount={totalItems}
        />
      )}
    </>
  );
};
