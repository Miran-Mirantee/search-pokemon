"use client";

import { useQuery } from "@apollo/client";
import { GET_POKEMONS } from "@/lib/queries";
import { useEffect } from "react";

export default function Home() {
  const { loading, error, data } = useQuery(GET_POKEMONS, {
    variables: { first: 1 },
  });

  useEffect(() => {
    console.log("data", data);
  }, [data]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gray-600">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {loading ? "loading" : data.pokemons[0].name}
      </main>
    </div>
  );
}
