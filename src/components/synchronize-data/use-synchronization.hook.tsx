import IndexedDb from "@/helpers/index-db/index-db";
import { PokemonList, usePokemon } from "@/hooks/use-pokemon.hook";
import { Pokemon } from "@/types/pokemon.type";
import { useCallback, useEffect, useState } from "react";

export const useSynchronization = () => {
  const [data, setData] = useState<PokemonList>();
  const [allPokemonData, setAllPokemonData] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingData, setIsLoadingData] = useState<string | undefined>();

  const db = new IndexedDb("PokemonDB", "pokemon");

  const insertPokemonToDB = useCallback(
    async (data: Pokemon) => {
      const result = await db.putValue("pokemon", data);
      setIsLoadingData(`Catching ${data.name}`);
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
      console.log("All Pokémon inserted!");
    } catch (error) {
      console.error("Error inserting Pokémon:", error);
    }
  }, [allPokemonData, insertPokemonToDB, setIsLoading]);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=50`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
      });
  }, []);

  useEffect(() => {
    if (!data) return;
    Promise.all(
      data.results.map((item) => {
        return fetch(`https://pokeapi.co/api/v2/pokemon/${item.name}`)
          .then((res) => {
            if (!res.ok) {
              throw new Error("Failed to fetch data");
            }
            return res.json();
          })
          .then((data) => {
            setAllPokemonData((prev) => [...prev, data]);
          });
      })
    );
  }, [data]);

  useEffect(() => {
    if (allPokemonData.length > 0) {
      insertAllPokemonToDb();
    }
  }, [allPokemonData, insertAllPokemonToDb]);

  return { allPokemonData, isLoading, isLoadingData };
};
