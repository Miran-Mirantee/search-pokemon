import Pokemon from "@/types/Pokemon";
import { Badge, badgeVariants } from "./badge";
import { Swords, ChevronsRight, ChevronsDown } from "lucide-react";
import Image from "next/image";
import EvolutionItem from "./evolutionItem";
import extractWeight from "@/utils/extractWeight";
import extractHeight from "@/utils/extractHeight";
import EvolutionItemProps from "@/types/EvolutionItemProps";
import React from "react";
import AttackSkill from "./attackSkill";

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
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2 md:grid md:grid-cols-4 md:grid-rows-5">
        <div className="flex flex-col items-center md:row-span-2 md:col-span-2">
          <div className="font-bold text-2xl">{`#${pokemon.number} ${pokemon.name}`}</div>
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
          className="md:col-start-1 md:col-span-2 md:row-start-1 md:row-span-5 rounded-lg shadow-lg"
        />
        <div className="grid grid-cols-subgrid col-span-2 row-span-3 gap-2">
          <div className="flex flex-col col-span-2 lg:col-span-1 lg:row-span-2">
            <div>
              <span className="font-bold">Max HP: </span>
              {pokemon.maxHP}
            </div>
            <div>
              <span className="font-bold">Max CP: </span>
              {pokemon.maxCP}
            </div>
            <div>
              <span className="font-bold">Flee rate: </span>
              {Math.round(pokemon.fleeRate * 100)}%
            </div>
            <div>
              <span className="font-bold">Height: </span>
              {`${extractHeight(pokemon.height.minimum)} - ${extractHeight(
                pokemon.height.maximum
              )} m`}
            </div>
            <div>
              <span className="font-bold">Weight: </span>
              {`${extractWeight(pokemon.weight.minimum)} - ${extractWeight(
                pokemon.weight.maximum
              )} kg`}
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
        <div className="flex flex-col md:hidden">
          <div className="font-bold">Types:</div>
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
        <div className="flex flex-col">
          <div className="font-bold">Resistant:</div>
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
        <div className="flex flex-col">
          <div className="font-bold">Weaknesses:</div>
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

      <div className="flex flex-col gap-3 md:grid md:grid-cols-2">
        <div className="flex flex-col">
          <div className="font-bold">Fast Attacks:</div>
          <ul className="flex flex-col gap-1">
            {pokemon.attacks.fast.map((attack, index) => (
              <AttackSkill key={index} attack={attack} />
            ))}
          </ul>
        </div>
        <div className="flex flex-col">
          <div className="font-bold">Special Attacks:</div>
          <ul className="flex flex-col gap-1">
            {pokemon.attacks.special.map((attack, index) => (
              <AttackSkill key={index} attack={attack} />
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <div className="font-bold">Evolution: </div>
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
