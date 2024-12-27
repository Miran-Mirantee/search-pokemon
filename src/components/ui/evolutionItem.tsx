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
      className="flex flex-col items-center bg-zinc-300 hover:cursor-pointer w-64 p-3 rounded-md gap-2 shadow-xl"
      onClick={() => {
        onClickItem(props.name);
      }}
    >
      <div className="font-bold text-xl">{`#${props.number} ${props.name}`}</div>
      <Image
        src={props.image}
        alt={props.name}
        loading="lazy"
        width={0}
        height={0}
        sizes="100vw"
        style={{
          width: "100%",
          height: "auto",
        }}
        className="rounded-sm"
      />
      {props.evolutionRequirements && (
        <div>{`Requirement: ${props.evolutionRequirements.amount} ${props.evolutionRequirements.name}`}</div>
      )}
    </div>
  );
};

export default EvolutionItem;
