import { useQuery } from 'react-apollo';

import { ALL_POKEMON } from '../graphql';

export interface PokemonResponse {
  Pokemons: {
    name: string;
  }[];
}

export const normalizePokemonData = (
  pokemons?: PokemonResponse['Pokemons']
) => {
  if (!pokemons) {
    return [] as string[];
  }
  return pokemons.reduce((pokemons, { name }) => {
    pokemons.push(name);
    return pokemons;
  }, [] as string[]);
};

export const useAllPokemonQuery = () => {
  const { loading, data, error } = useQuery<PokemonResponse>(ALL_POKEMON);
  return {
    loading,
    data: normalizePokemonData(data?.Pokemons),
    error,
  };
};
