import { Pokemon } from "@/types/pokemon.type";
import {
  DataGrid,
  GridCallbackDetails,
  GridPaginationModel,
} from "@mui/x-data-grid";
import { POKEMON_TABLE_COLUMNS } from "./pokemon-table-columns.helper";
import { useState } from "react";
import { PokemonList } from "../pokemon-list.component";

type PokemonTableProps = {
  pokemonList: Pokemon[];
  isLoading: boolean;
  totalItems: number;
};
export const PokemonTable = ({
  pokemonList,
  isLoading,
  totalItems,
}: PokemonTableProps) => {
  const columns = POKEMON_TABLE_COLUMNS;
  const [paginationModel, setPaginationMoel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 0,
  });

  const handleChangePage = (
    model: GridPaginationModel,
    details: GridCallbackDetails<any>
  ) => {
    setPaginationMoel(model);
  };
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
