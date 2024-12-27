"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";
import { GET_POKEMON } from "@/lib/queries";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import PokemonResult from "@/components/ui/pokemonResult";
import Pokemon from "@/types/Pokemon";
import Image from "next/image";

const formSchema = z.object({
  pokemonName: z.string(),
});

export default function Home() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const query = searchParams.get("search")?.toString() ?? "";
  const [pokemonData, setPokemonData] = useState<Pokemon | null>(null);

  const { loading, error, data } = useQuery(GET_POKEMON, {
    variables: { name: query },
    skip: !query.length,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pokemonName: query,
    },
  });

  useEffect(() => {
    form.setValue("pokemonName", query);
  }, [query, form]);

  useEffect(() => {
    if (data) {
      setPokemonData(data.pokemon);
    }
  }, [data]);

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
        flex
        justify-center
        min-h-screen
        font-[family-name:var(--font-geist-sans)]
      `}
    >
      <main
        className={`
          flex
          flex-col
          items-center
          gap-8
          px-10
          pb-8
          mx-8
          md:mx-24
          bg-slate-300/80
          xl:w-3/4
          2xl:w-3/5
          backdrop-blur-sm
        `}
        style={{
          justifyContent: query.length ? "start" : "center",
          alignSelf: query.length ? "auto" : "center",
          borderRadius: query.length ? 0 : 64,
        }}
      >
        <div
          className="flex flex-col lg:flex-row items-center pt-2 gap-3 w-full"
          style={{ flexDirection: query.length ? "row" : "column" }}
        >
          <Image
            src={"/pokemonLogo.png"}
            alt="logo"
            width={160}
            height={0}
            style={{ display: query.length ? "block" : "none" }}
          />
          <Image
            src={"/pokemonLogo.png"}
            alt="logo"
            width={560}
            height={0}
            className="pt-8"
            style={{ display: query.length ? "none" : "block" }}
          />
          <span
            className="text-2xl font-bold lg:mr-auto"
            style={{ marginRight: query.length ? "auto" : 0 }}
          >
            Wikipedia
          </span>

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
        </div>

        <PokemonResult
          loading={loading}
          error={error}
          data={pokemonData}
          query={query}
        />
      </main>

      <div className="fixed h-full w-full bg-[url('/background.png')] bg-no-repeat bg-cover bg-center -z-10">
        <div className="bg-gradient-to-t from-slate-900 to-transparent h-full w-full mix-blend-multiply " />
      </div>
    </div>
  );
}
