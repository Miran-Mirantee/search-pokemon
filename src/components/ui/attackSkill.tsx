import { Swords } from "lucide-react";
import { Badge, badgeVariants } from "./badge";
import Attack from "@/types/Attack";

const AttackSkill = ({ attack }: { attack: Attack }) => {
  return (
    <li className="flex items-center">
      <span title="Damage">
        <Swords size={24} className="bg-red-800 text-white p-1 rounded-full" />
      </span>
      <span className="w-9 text-center">{attack.damage}</span>
      <Badge
        variant={attack.type.toLowerCase() as keyof typeof badgeVariants}
        className="mr-2"
      >
        {attack.type}
      </Badge>
      {attack.name}
    </li>
  );
};

export default AttackSkill;
