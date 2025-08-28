import React, { useEffect, useState } from "react";
import PokemonCards from "./PokemonCards";
import type { PokemonData } from "./PokemonCards";

const API = "https://pokeapi.co/api/v2/pokemon?limit=124";

const Pokemon: React.FC = () => {
  const [pokemon, setPokemon] = useState<PokemonData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [search, setSearch] = useState("");

  const fetchPokemon = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();

      const detailedPokemonData = data.results.map(
        async (curPokemon: { url: string }) => {
          const res = await fetch(curPokemon.url);
          const data = await res.json();
          return data;
        }
      );

      const detailedResponses = await Promise.all(detailedPokemonData);
      setPokemon(detailedResponses);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  const searchData = pokemon.filter((curPokemon) =>
    curPokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h1 className="text-3xl font-bold">Loading....</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h1 className="text-3xl font-bold">{error.message}</h1>
      </div>
    );
  }

  return (
    <section className="max-w-screen-xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-5xl font-bold text-center">Lets Catch Pokémon</h1>
      </header>
      <div className="flex justify-center mb-8">
        <div className="relative w-80">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search Pokémon"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 w-full rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400 bg-pink-100 text-lg text-black border border-blue-200 placeholder-gray-400 transition"
          />
        </div>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {searchData.map((curPokemon) => (
          <PokemonCards key={curPokemon.id} pokemonData={curPokemon} />
        ))}
      </ul>
    </section>
  );
};

export default Pokemon;
