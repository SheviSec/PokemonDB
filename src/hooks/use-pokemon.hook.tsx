import { Pokemon } from "@/types/pokemon.type";
import { useEffect, useState } from "react";

type PokemonList = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
};

type UsePokemonReturn = {
  pokemonList: Pokemon[] | undefined;
  isLoading: boolean;
  error: Error | undefined;
  totalItems: number;
  changePaginationModel: (paginationModel: PaginationModel) => void;
  paginationModel: PaginationModel;
};

export type PaginationModel = {
  page: number;
  pageSize: number;
};

export const usePokemon = (): UsePokemonReturn => {
  const [data, setData] = useState<PokemonList | undefined>();
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<Error | undefined>();
  const [pokemonList, setPokemonList] = useState<Pokemon[] | undefined>();
  const [paginationModel, setPaginationModel] = useState<PaginationModel>({
    page: 0,
    pageSize: 20,
  });

  /**
   * Get pokemon list, only names and url to get individual data
   */
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon")
      .then((res) => {
        if (!res.ok) {
          // throw new Error("Failed to fetch data");
          setError(new Error("Failed to fetch data"));
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
      });
  }, [setData, setLoading]);

  /**
   * get list with all single pokemon data
   */
  useEffect(() => {
    if (!data) return;
    const result = Promise.all(
      data.results.map(async (item) => {
        return await fetch(`https://pokeapi.co/api/v2/pokemon/${item.name}`)
          .then((res) => {
            if (!res.ok) {
              setError(new Error("Failed to fetch data"));
            }
            return res.json();
          })
          .then((data) => {
            return data;
          });
      })
    )
      .then((pokemon) => {
        return pokemon;
      })
      .then((data) => {
        setPokemonList(data);
        setLoading(false);
      });
  }, [data, setError, setPokemonList]);

  const changePaginationModel = (paginationModel: PaginationModel) => {
    setPaginationModel(paginationModel);
  };

  const totalItems = data?.count ?? 0;

  return {
    pokemonList,
    isLoading,
    error,
    totalItems: totalItems,
    changePaginationModel,
    paginationModel,
  };
};
