import { Pokemon } from "@/types/pokemon.type";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { PokemonImg } from "./pokemon-img.component";

type PokemonTableProps = {
  pokemonList: Pokemon[] | undefined;
  isLoading: Boolean;
};
export const PokemonTable = ({ pokemonList, isLoading }: PokemonTableProps) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Height</TableCell>
            <TableCell>Weight</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pokemonList ? (
            pokemonList.length > 0 &&
            pokemonList.map((pokemon) => {
              return (
                <TableRow key={pokemon.id}>
                  <TableCell>
                    <PokemonImg
                      url={
                        pokemon.sprites.other?.["official-artwork"]
                          .front_default ?? null
                      }
                      imgProps={{ style: { maxWidth: "150px" } }}
                    />
                  </TableCell>
                  {/* <TableCell>
                    {pokemon.types.map((type) => (
                      <Typography>{type.type.name}</Typography>
                    ))}
                  </TableCell> */}

                  <TableCell>{pokemon.name}</TableCell>
                  <TableCell>{pokemon.height}</TableCell>
                  <TableCell>{pokemon.weight}</TableCell>
                </TableRow>
              );
            })
          ) : isLoading ? (
            <TableRow>
              <TableCell>
                <Typography>Loading...</Typography>
              </TableCell>
            </TableRow>
          ) : (
            <TableRow>
              <TableCell>
                <Typography>ERROR!</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
