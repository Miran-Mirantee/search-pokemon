import Image from "next/image";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import EvolutionItemProps from "@/types/EvolutionItemProps";

const EvolutionItem = ({ props }: { props: EvolutionItemProps }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const onClickItem = (pokemonName: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("search", pokemonName);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div
      className="flex flex-col items-center bg-slate-400 hover:cursor-pointer"
      onClick={() => {
        onClickItem(props.name);
      }}
    >
      <div className="font-bold text-xl">{`#${props.number} ${props.name}`}</div>
      <Image
        src={props.image}
        alt={props.name}
        loading="lazy"
        width={250}
        height={300}
      />
      {props.evolutionRequirements && (
        <div>{`Requirement: ${props.evolutionRequirements.amount} ${props.evolutionRequirements.name}`}</div>
      )}
    </div>
  );
};

export default EvolutionItem;
