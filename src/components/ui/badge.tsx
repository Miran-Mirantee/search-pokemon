import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
        normal: "border-transparent text-black shadow bg-[#dcdcdc]",
        fire: "border-transparent text-white shadow bg-[#ff6900]",
        water: "border-transparent text-white shadow bg-[#14b9ff]",
        grass: "border-transparent text-black shadow bg-[#b4f000]",
        electric: "border-transparent text-black shadow bg-[#ffe100]",
        ice: "border-transparent text-black shadow bg-[#14f5ff]",
        fighting: "border-transparent text-white shadow bg-[#dc6900]",
        poison: "border-transparent text-white shadow bg-[#d28cd2]",
        ground: "border-transparent text-black shadow bg-[#fac85a]",
        flying: "border-transparent text-black shadow bg-[#78dcff]",
        psychic: "border-transparent text-white shadow bg-[#f08cdc]",
        bug: "border-transparent text-white shadow bg-[#46c846]",
        rock: "border-transparent text-white shadow bg-[#b48c64]",
        ghost: "border-slate-500 text-black shadow bg-[#a08cff",
        dragon: "border-transparent text-white shadow bg-[#5078dc]",
        fairy: "border-transparent text-black shadow bg-[#ffafdc] ",
        steel: "border-transparent text-black shadow bg-[#aac8f0] ",
        dark: "border-transparent text-white shadow bg-[#787878] ",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
