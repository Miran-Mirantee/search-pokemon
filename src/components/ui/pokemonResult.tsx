"use client";

import { ApolloError } from "@apollo/client";
import Pokemon from "@/types/Pokemon";
import PokemonLoading from "./pokemonLoading";
import PokemonError from "./pokemonError";
import PokemonNotFound from "./pokemonNotFound";
import PokemonDetails from "./pokemonDetails";

const PokemonResult = ({
  loading,
  error,
  data,
  query,
}: {
  loading: boolean;
  error: ApolloError | undefined;
  data: Pokemon | null;
  query: string;
}) => {
  if (loading) return <PokemonLoading />;

  if (error) return <PokemonError />;

  if (query && !data) return <PokemonNotFound />;

  if (query && data) return <PokemonDetails pokemon={data} />;

  return <></>;
};

export default PokemonResult;
