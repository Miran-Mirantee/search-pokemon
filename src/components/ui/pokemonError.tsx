import { Ban } from "lucide-react";

const PokemonError = () => {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <Ban size={36} />
      <div>Something went wrong. Please try again later.</div>
    </div>
  );
};

export default PokemonError;
