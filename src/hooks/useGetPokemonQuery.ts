import { ApolloError } from 'apollo-boost';
import { useQuery } from 'react-apollo';

import { GET_POKEMON } from '../graphql';
import { Pokemon, PokemonStats } from '../types';

enum AVAILABLE_STATS {
  hp = 'hp',
  attack = 'attack',
  defense = 'defense',
  'special-attack' = 'specialAttack',
  'special-defense' = 'specialDefense',
  speed = 'speed',
}

export interface PokemonResponse {
  Pokemon: {
    id: string;
    name: string;
    image: string;
    types: { name: string }[];
    abilities: { name: string }[];
    stats: { name: keyof typeof AVAILABLE_STATS; value: number }[];
    moves: { name: string; learnMethod: string }[];
  };
}

export interface AllPokemonHookResponse {
  loading: boolean;
  error?: ApolloError;
  data: Pokemon[];
}

const DEFAULT_STATS: PokemonStats = {
  hp: null,
  attack: null,
  defense: null,
  specialAttack: null,
  specialDefense: null,
  speed: null,
};

export const normalizePokemonData = (
  pokemonResponse?: PokemonResponse['Pokemon']
) => {
  if (!pokemonResponse) {
    return {} as Pokemon;
  }
  const { id, name, image, types, abilities, stats, moves } = pokemonResponse;
  const groupedMoves = moves.reduce((availableMoves, move) => {
    if (!availableMoves[move.learnMethod]) {
      availableMoves[move.learnMethod] = [];
    }
    availableMoves[move.learnMethod].push({
      name: move.name,
      learnMethod: move.learnMethod,
    });
    return availableMoves;
  }, {} as Pokemon['availableMoves']);
  return {
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
    availableMoves: groupedMoves,
  } as Pokemon;
};

export const useGetPokemonQuery = (selectedPokemon?: string | null) => {
  const { loading, data, error } = useQuery(GET_POKEMON, {
    variables: { pokemon: selectedPokemon },
    skip: !selectedPokemon,
  });
  return {
    loading,
    data: loading ? ({} as Pokemon) : normalizePokemonData(data?.Pokemon),
    error,
  };
};
