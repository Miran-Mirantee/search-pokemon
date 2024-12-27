"use client";
import { LoaderCircle } from "lucide-react";

const PokemonLoading = () => {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <LoaderCircle className="animate-spin " size={36} />
      <div>Loading...</div>
    </div>
  );
};

export default PokemonLoading;
