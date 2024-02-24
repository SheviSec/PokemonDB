import {
  PokemonData,
  usePokemonFromDB,
} from "@/hooks/use-pokemon.-from-db.hook";
import { PaginationModel } from "@/hooks/use-pokemon.hook";
import { Pokemon } from "@/types/pokemon.type";
import { useState } from "react";

type UsePokemonListReturn = {
  data: PokemonData | undefined;
  isLoading: boolean;
  error: Error | undefined;
  totalItems: number;
  paginationModel: PaginationModel | undefined;
  changePaginationModel: (
    pagionationModel: PaginationModel | undefined
  ) => void;
};

export const usePokemonList = (): UsePokemonListReturn => {
  const [paginationModel, setPaginationModel] = useState<
    PaginationModel | undefined
  >();
  const { data, isLoading, error } = usePokemonFromDB({
    pagination: paginationModel,
  });

  const totalItems = data?.totalItems ?? 0;

  const changePaginationModel = (
    paginationModel: PaginationModel | undefined
  ) => {
    setPaginationModel(paginationModel);
  };

  return {
    data,
    isLoading,
    error,
    totalItems,
    paginationModel,
    changePaginationModel,
  };
};
