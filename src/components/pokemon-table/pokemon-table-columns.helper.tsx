import { Pokemon } from "@/types/pokemon.type";
import { GridColDef } from "@mui/x-data-grid";
import { PokemonImg } from "../common/pokemon-img.component";
import { Box } from "@mui/material";

export const POKEMON_TABLE_COLUMNS: GridColDef<Pokemon>[] = [
  {
    field: "id",
    headerName: "Nº",
  },
  {
    field: "image",
    headerName: "Image",
    renderCell: (params) => {
      return (
        <PokemonImg
          url={
            // params.row.sprites.other?.["official-artwork"].front_default ??
            params.row.sprites.front_default ?? null
          }
          imgProps={{ style: { height: "48px" } }}
        />
      );
    },
  },
  { field: "name", headerName: "Name" },
  { field: "height", headerName: "Height" },
  { field: "weight", headerName: "Weight" },
  {
    field: "types",
    headerName: "Types",
    renderCell: (params) => {
      return (
        <Box sx={{ display: "flex", columnGap: 1 }}>
          {params.row.types.map((type) => (
            <img
              key={type.type.name}
              src={`/img/pokemon-types-icons/${type.type.name}.svg`}
              width={"24px"}
              height={"24px"}
              style={{ color: "#000" }}
            />
          ))}
        </Box>
      );
    },
  },
];
