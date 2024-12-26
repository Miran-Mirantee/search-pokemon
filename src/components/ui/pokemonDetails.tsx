import Pokemon from "@/types/Pokemon";
import { Badge, badgeVariants } from "./badge";
import { Swords } from "lucide-react";
import EvolutionItem from "./evolutionItem";
import extractWeight from "@/utils/extractWeight";
import extractHeight from "@/utils/extractHeight";
import EvolutionItemProps from "@/types/EvolutionItemProps";

const PokemonDetails = ({ pokemon }: { pokemon: Pokemon }) => {
  const newEvolutionData = [
    {
      id: pokemon.id,
      evolutionRequirements: null,
      image: pokemon.image,
      name: pokemon.name,
      number: pokemon.number,
    },
    ...(pokemon.evolutions
      ? pokemon.evolutions.map((evolution, index) => {
          if (index == 0) {
            return {
              ...evolution,
              evolutionRequirements: pokemon.evolutionRequirements,
            };
          } else {
            return {
              ...evolution,
              evolutionRequirements:
                pokemon.evolutions[index - 1].evolutionRequirements,
            };
          }
        })
      : ""),
  ] as EvolutionItemProps[];
  console.log("newEvolutionData", newEvolutionData);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col items-center">
        <div className="font-bold text-xl">{`#${pokemon.number} ${pokemon.name}`}</div>
        <div>{pokemon.classification}</div>
      </div>
      <img src={pokemon.image} alt={pokemon.name} />
      <div className="flex flex-col">
        <div>Max HP: {pokemon.maxHP}</div>
        <div>Max CP: {pokemon.maxCP}</div>
        <div>Flee rate: {pokemon.fleeRate * 100}%</div>
        <div>
          {`Height: ${extractHeight(pokemon.height.minimum)} - ${extractHeight(
            pokemon.height.maximum
          )} m`}
        </div>
        <div>
          {`Weight: ${extractWeight(pokemon.weight.minimum)} - ${extractWeight(
            pokemon.weight.maximum
          )} kg`}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div>
          <div>Types:</div>
          <ul className="flex gap-1">
            {pokemon.types.map((type, index) => (
              <li key={index}>
                <Badge
                  variant={type.toLowerCase() as keyof typeof badgeVariants}
                >
                  {type}
                </Badge>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div>Resistant:</div>
          <ul className="flex gap-1">
            {pokemon.resistant.map((element, index) => (
              <li key={index}>
                <Badge
                  variant={element.toLowerCase() as keyof typeof badgeVariants}
                >
                  {element}
                </Badge>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div>Weaknesses:</div>
          <ul className="flex gap-1">
            {pokemon.weaknesses.map((weakness, index) => (
              <li key={index}>
                <Badge
                  variant={weakness.toLowerCase() as keyof typeof badgeVariants}
                >
                  {weakness}
                </Badge>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col">
        <div>Attacks:</div>
        <div>
          <div>Fast:</div>
          <ul>
            {pokemon.attacks.fast.map((attack, index) => (
              <li key={index} className="flex items-center">
                <Swords size={"16px"} />
                <span className="w-6 text-center">{attack.damage}</span>
                <Badge
                  variant={
                    attack.type.toLowerCase() as keyof typeof badgeVariants
                  }
                  className="mr-2"
                >
                  {attack.type}
                </Badge>
                {attack.name}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div>Special:</div>
          <ul>
            {pokemon.attacks.special.map((attack, index) => (
              <li key={index} className="flex items-center">
                <Swords size={"16px"} />
                <span className="w-9 text-center">{attack.damage}</span>
                <Badge
                  variant={
                    attack.type.toLowerCase() as keyof typeof badgeVariants
                  }
                  className="mr-2"
                >
                  {attack.type}
                </Badge>
                {attack.name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col">
        <div>Evolution:</div>
        <div className="flex flex-col gap-3">
          {newEvolutionData &&
            newEvolutionData.map((evolution, index) => (
              <EvolutionItem props={evolution} key={evolution.id} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;
