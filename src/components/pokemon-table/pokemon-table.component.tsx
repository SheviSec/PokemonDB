import { Pokemon } from "@/types/pokemon.type";
import {
  DataGrid,
  GridCallbackDetails,
  GridPaginationModel,
  GridRowParams,
} from "@mui/x-data-grid";
import { POKEMON_TABLE_COLUMNS } from "./pokemon-table-columns.helper";
import { PokemonList } from "../pokemon-list/pokemon-list.component";
import { PaginationModel } from "@/hooks/use-pokemon.hook";
import { useState } from "react";
import { Card, ClickAwayListener, Drawer } from "@mui/material";
import { PokemonSheet } from "../pokemon-sheet/pokemon-sheet.component";

type PokemonTableProps = {
  pokemonList: Pokemon[];
  isLoading: boolean;
  totalItems: number;
  paginationModel: PaginationModel | undefined;
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

  const handleRowClick = (params: GridRowParams<Pokemon>) => {
    const pokemon = params.row;
    setPokemonSheet(pokemon);
  };

  const [pokemonSheet, setPokemonSheet] = useState<Pokemon | undefined>();

  return (
    <>
      {pokemonList && PokemonList.length > 0 && (
        <DataGrid
          autoPageSize
          autoHeight
          pagination
          pageSizeOptions={[10, 20, 50, 100]}
          paginationMode="server"
          onPaginationModelChange={handleChangePage}
          paginationModel={paginationModel}
          loading={isLoading}
          columns={columns}
          rows={pokemonList}
          rowCount={totalItems}
          onRowClick={handleRowClick}
        />
      )}
      <Drawer anchor="right" variant="persistent" open={!!pokemonSheet}>
        {pokemonSheet && (
          <PokemonSheet
            pokemon={pokemonSheet}
            onClose={() => setPokemonSheet(undefined)}
          />
        )}
      </Drawer>
    </>
  );
};
