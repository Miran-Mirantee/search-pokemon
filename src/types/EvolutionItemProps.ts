import PokemonEvolutionRequirement from "./PokemonEvolutionRequirement";

type EvolutionItemProps = {
  id: string;
  evolutionRequirements: PokemonEvolutionRequirement | null;
  image: string;
  name: string;
  number: string;
};

export default EvolutionItemProps;
