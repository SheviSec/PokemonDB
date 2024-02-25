import IndexedDb from "@/helpers/index-db/index-db";
import { PokemonList, usePokemon } from "@/hooks/use-pokemon.hook";
import { Pokemon } from "@/types/pokemon.type";
import { useCallback, useEffect, useState } from "react";

export const useSynchronization = () => {
  const [data, setData] = useState<PokemonList>();
  const [allPokemonData, setAllPokemonData] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingData, setIsLoadingData] = useState<string | undefined>();
  const [dataInserted, setDataInserted] = useState(false); // Flag to track data insertion

  const db = new IndexedDb("PokemonDB", "pokemon");

  const insertPokemonToDB = useCallback(
    async (data: Pokemon) => {
      const result = await db.putValue("pokemon", data);
      setIsLoadingData(`Catching #${data.id} ${data.name}`);
      return result;
    },
    [setIsLoadingData]
  );

  const insertAllPokemonToDb = useCallback(async () => {
    try {
      await Promise.all(
        allPokemonData.map((pokemon) => {
          return insertPokemonToDB(pokemon);
        })
      );
      setIsLoading(false);
    } catch (error) {
      console.error("Error inserting Pokémon:", error);
    }
  }, [allPokemonData, insertPokemonToDB, setIsLoading]);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=2000`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        setIsLoadingData(`Entering to tall grass...`);
        return res.json();
      })
      .then((data) => {
        setData(data);
      });
  }, [setIsLoadingData, setData]);

  useEffect(() => {
    if (!data) return;
    Promise.all(
      data.results.map(async (item) => {
        return fetch(`https://pokeapi.co/api/v2/pokemon/${item.name}`)
          .then((res) => {
            if (!res.ok) {
              throw new Error("Failed to fetch data");
            }
            setIsLoadingData("Identifying species...");
            return res.json();
          })
          .then((data) => {
            return data;
          });
      })
    ).then((data) => {
      setAllPokemonData(data);
    });
  }, [data, setIsLoadingData, setAllPokemonData]);

  useEffect(() => {
    if (allPokemonData.length > 0 && !dataInserted) {
      insertAllPokemonToDb();
      setDataInserted(true); // Set the flag to true after data insertion
    }
  }, [allPokemonData, insertAllPokemonToDb]);

  return {
    allPokemonData,
    isLoading,
    isLoadingData,
    setDataInserted,
    dataInserted,
  };
};
