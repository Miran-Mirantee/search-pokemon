import PokemonAttack from "./PokemonAttack";
import PokemonDimension from "./PokemonDimension";
import PokemonEvolutionRequirement from "./PokemonEvolutionRequirement";

type Pokemon = {
  id: string;
  number: string;
  name: string;
  weight: PokemonDimension;
  height: PokemonDimension;
  classification: string;
  types: string[];
  resistant: string[];
  attacks: PokemonAttack;
  weaknesses: string[];
  fleeRate: number;
  maxCP: number;
  evolutions: Pokemon[];
  evolutionRequirements: PokemonEvolutionRequirement;
  maxHP: number;
  image: string;
};

export default Pokemon;
