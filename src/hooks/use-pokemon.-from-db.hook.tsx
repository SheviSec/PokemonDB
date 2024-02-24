import IndexedDb from "@/helpers/index-db/index-db";
import { Pokemon } from "@/types/pokemon.type";
import { useEffect, useState } from "react";
import { PaginationModel } from "./use-pokemon.hook";

type UsePokemonFromDBReturn = {};

type UsePokemonFromDBProps = {
  pagination?: PaginationModel;
};

export type PokemonData = {
  items: Pokemon[] | undefined;
  totalItems: number;
};

export const usePokemonFromDB = ({ pagination }: UsePokemonFromDBProps) => {
  const [data, setData] = useState<PokemonData>();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | undefined>();
  const [paginationModel, setPaginationModel] = useState<
    PaginationModel | undefined
  >(pagination);

  useEffect(() => {
    setPaginationModel(pagination);
  }, [pagination]);

  useEffect(() => {
    const db = new IndexedDb("PokemonDB", "pokemon");

    const pokemon = db
      .getAllValue("pokemon", paginationModel)
      .then((result) => {
        if (!result) setError(new Error("NO DATA!"));
        console.log(result, paginationModel);
        setData({ items: result.data, totalItems: result.count });
        setIsLoading(false);
        return result;
      });
  }, [setData, setIsLoading, paginationModel]);

  return {
    data,
    isLoading,
    error,
  };
};
