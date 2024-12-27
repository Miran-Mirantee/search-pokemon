import { SearchX } from "lucide-react";

const PokemonNotFound = () => {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <SearchX size={36} />
      <div>Oops! We couldn’t find what you’re looking for.</div>
    </div>
  );
};

export default PokemonNotFound;
