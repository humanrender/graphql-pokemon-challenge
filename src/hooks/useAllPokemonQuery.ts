import { useQuery } from 'react-apollo';

import { ALL_POKEMON } from '../graphql';
import { Pokemon, PokemonStats } from '../types';

interface PokemonResponse {
  Pokemons: {
    id: string;
    name: string;
    image: string;
    types: { name: string }[];
    abilities: { name: string }[];
    stats: { name: keyof typeof AVAILABLE_STATS; value: number }[];
  }[];
}

export interface PokemonList {
  [key: string]: Pokemon;
}

enum AVAILABLE_STATS {
  hp = 'hp',
  attack = 'attack',
  defense = 'defense',
  'special-attack' = 'specialAttack',
  'special-defense' = 'specialDefense',
  speed = 'speed',
}

const DEFAULT_STATS: PokemonStats = {
  hp: null,
  attack: null,
  defense: null,
  specialAttack: null,
  specialDefense: null,
  speed: null,
};

const normalizePokemonData = (pokemons?: PokemonResponse['Pokemons']) => {
  if (!pokemons) {
    return {} as PokemonList;
  }
  return pokemons.reduce(
    (pokemons, { id, name, image, types, abilities, stats }) => {
      pokemons[id] = {
        id,
        name,
        image,
        type: types[0]?.name,
        abilities: abilities.map(({ name: abilityName }) => abilityName),
        stats: stats.reduce(
          (pokemonStats, { name: statName, value: statValue }) => {
            const availableStatName = AVAILABLE_STATS[statName];
            if (availableStatName) {
              pokemonStats[availableStatName] = statValue;
            }
            return pokemonStats;
          },
          { ...DEFAULT_STATS } as PokemonStats
        ),
      };
      return pokemons;
    },
    {} as PokemonList
  );
};

export const useAllPokemonQuery = () => {
  const { loading, data, error } = useQuery<PokemonResponse>(ALL_POKEMON);
  return {
    loading,
    data: normalizePokemonData(data?.Pokemons),
    error,
  };
};
