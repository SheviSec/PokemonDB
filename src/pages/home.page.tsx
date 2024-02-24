import { DefaultLayout } from "@/layouts/default.layout";
import { PokemonList } from "@/components/pokemon-list/pokemon-list.component";

const HomePage = () => {
  return (
    <DefaultLayout>
      <PokemonList />
    </DefaultLayout>
  );
};

export default HomePage;
