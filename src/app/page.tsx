"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";
import { GET_POKEMONS } from "@/lib/queries";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

const formSchema = z.object({
  pokemonName: z.string(),
});

export default function Home() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const { loading, error, data } = useQuery(GET_POKEMONS, {
    variables: { first: 1 },
  });

  useEffect(() => {
    console.log("data", data);
  }, [data]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pokemonName: searchParams.get("search")?.toString(),
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const params = new URLSearchParams(searchParams);
    const { pokemonName } = values;
    if (pokemonName) {
      params.set("search", pokemonName);
    } else {
      params.delete("search");
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div
      className={`
        grid
        grid-rows-[20px_1fr_20px]
        items-center
        justify-items-center
        min-h-screen
        p-8
        pb-20
        gap-16
        sm:p-20
        font-[family-name:var(--font-geist-sans)]
        bg-gray-600
      `}
    >
      <main
        className={`
          flex
          flex-col
          gap-8
          row-start-2
          p-10
          items-center
          sm:items-start
          bg-slate-300
          rounded-xl
        `}
      >
        <p>Pokemon Wikipedia</p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={`
            flex
            gap-2
          `}
          >
            <FormField
              control={form.control}
              name="pokemonName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter pokemon name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button>Search</Button>
          </form>
        </Form>
      </main>
    </div>
  );
}
