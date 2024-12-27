import Pokemon from "@/types/Pokemon";
import { Badge, badgeVariants } from "./badge";
import { Swords, ChevronsRight, ChevronsDown } from "lucide-react";
import Image from "next/image";
import EvolutionItem from "./evolutionItem";
import extractWeight from "@/utils/extractWeight";
import extractHeight from "@/utils/extractHeight";
import EvolutionItemProps from "@/types/EvolutionItemProps";
import React from "react";

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

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col md:grid md:grid-cols-4 md:grid-rows-5">
        <div className="flex flex-col items-center md:row-span-2 md:col-span-2">
          <div className="font-bold text-xl">{`#${pokemon.number} ${pokemon.name}`}</div>
          <div>{pokemon.classification}</div>
        </div>
        <Image
          src={pokemon.image}
          alt={pokemon.name}
          height={0}
          width={0}
          sizes="100vw"
          loading="lazy"
          style={{ height: "100%", width: "auto" }}
          className="md:col-start-1 md:col-span-2 md:row-start-1 md:row-span-5"
        />
        <div className="grid grid-cols-subgrid col-span-2 row-span-3 gap-2">
          <div className="flex flex-col col-span-2 lg:col-span-1 lg:row-span-2">
            <div>Max HP: {pokemon.maxHP}</div>
            <div>Max CP: {pokemon.maxCP}</div>
            <div>Flee rate: {Math.round(pokemon.fleeRate * 100)}%</div>
            <div>
              {`Height: ${extractHeight(
                pokemon.height.minimum
              )} - ${extractHeight(pokemon.height.maximum)} m`}
            </div>
            <div>
              {`Weight: ${extractWeight(
                pokemon.weight.minimum
              )} - ${extractWeight(pokemon.weight.maximum)} kg`}
            </div>
            <div className="hidden md:flex">
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
          </div>

          <div className="hidden lg:block">
            <div>Resistant:</div>
            <ul className="flex gap-1 flex-wrap">
              {pokemon.resistant.map((element, index) => (
                <li key={index}>
                  <Badge
                    variant={
                      element.toLowerCase() as keyof typeof badgeVariants
                    }
                  >
                    {element}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden lg:row-start-2 lg:col-start-2 lg:block">
            <div>Weaknesses:</div>
            <ul className="flex gap-1 flex-wrap">
              {pokemon.weaknesses.map((weakness, index) => (
                <li key={index}>
                  <Badge
                    variant={
                      weakness.toLowerCase() as keyof typeof badgeVariants
                    }
                  >
                    {weakness}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 md:grid md:gap-0 md:grid-cols-2 md:grid-rows-1 lg:hidden">
        <div className="md:hidden">
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
          <ul className="flex gap-1 flex-wrap">
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
          <ul className="flex gap-1 flex-wrap">
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
        <div className="md:grid md:grid-cols-2">
          <div>
            <div>Fast:</div>
            <ul>
              {pokemon.attacks.fast.map((attack, index) => (
                <li key={index} className="flex items-center">
                  <span title="Damage">
                    <Swords size={"16px"} />
                  </span>
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
                  <span title="Damage">
                    <Swords size={"16px"} />
                  </span>
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
      </div>

      <div className="flex flex-col">
        <div>Evolution:</div>
        <div className="flex flex-col gap-1 items-center md:flex-row ">
          {newEvolutionData &&
            newEvolutionData.map((evolution, index) => (
              <React.Fragment key={index}>
                <EvolutionItem props={evolution} key={evolution.id} />
                {index + 1 != newEvolutionData.length && (
                  <>
                    <ChevronsRight size={64} className="hidden md:block" />
                    <ChevronsDown size={64} className="md:hidden" />
                  </>
                )}
              </React.Fragment>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;
