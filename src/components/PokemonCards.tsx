import React from "react";

type PokemonType = {
  type: {
    name: string;
  };
};

type AbilityType = {
  ability: {
    name: string;
  };
};

type StatType = {
  base_stat: number;
};

type SpritesType = {
  other: {
    dream_world: {
      front_default: string;
    };
  };
};

export interface PokemonData {
  id: number;
  name: string;
  sprites: SpritesType;
  types: PokemonType[];
  height: number;
  weight: number;
  stats: StatType[];
  base_experience: number;
  abilities: AbilityType[];
}

interface PokemonCardsProps {
  pokemonData: PokemonData;
}

const PokemonCards: React.FC<PokemonCardsProps> = ({ pokemonData }) => {
  return (
    <li className="w-80 min-h-[42rem] bg-white rounded-md p-6 relative hover:scale-105 transition-all border-">
      <div className="absolute top-0 left-0 w-full h-2/5 bg-[#ebfbf1] z-0"></div>
      <figure className="flex justify-center relative z-10">
        <img
          src={pokemonData.sprites.other.dream_world.front_default}
          alt={pokemonData.name}
          className="w-3/5 h-60 object-contain"
        />
      </figure>
      <h1 className="text-3xl font-bold text-center capitalize mt-6 z-10 relative">
        {pokemonData.name}
      </h1>
      <div className="flex justify-center items-center my-4 z-10 relative">
        <p className="px-6 py-2 bg-green-500 rounded-md text-white font-bold capitalize">
          {pokemonData.types.map((curType) => curType.type.name).join(", ")}
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4 text-center my-8 z-10 relative">
        <div>
            <span className="font-bold">Height:</span>
          <p>{pokemonData.height}</p>
        </div>
        <div>
            <span className="font-bold">Weight:</span>
          <p>{pokemonData.weight}</p>
        </div>
        <div>
          <span className="font-bold">Speed:</span>
          <p>{pokemonData.stats[5]?.base_stat}</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 text-center z-10 relative">
        <div>
            <span className="font-bold">Experience:</span>
          <p>{pokemonData.base_experience}</p>
        </div>
        <div>
        <span className="font-bold">Attack:</span>
          <p>{pokemonData.stats[1]?.base_stat}</p>
        </div>
        <div>
            <span className="font-bold">Abilities:</span>
          <p>
            {pokemonData.abilities
              .map((abilityInfo) => abilityInfo.ability.name)
              .slice(0, 1)
              .join(", ")}
          </p>
        </div>
      </div>
    </li>
  );
};

export default PokemonCards;