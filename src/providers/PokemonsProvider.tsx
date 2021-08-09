import React, { createContext, useState } from 'react';
import { useAllPokemonQuery } from '../hooks/useAllPokemonQuery';
import { useGetPokemonQuery } from '../hooks/useGetPokemonQuery';
import { Pokemon } from '../types';

export const PokemonsContext = createContext<{
  loadingPokemons: boolean;
  loadingPokemon: boolean;
  pokemonNames: string[];
  currentPokemon?: Pokemon;
  error?: Error;
  setCurrentPokemonName: (pokemonName: string | null) => void;
}>({
  loadingPokemons: false,
  loadingPokemon: false,
  pokemonNames: [] as string[],
  setCurrentPokemonName: () => {},
});

export const PokemonsProvider: React.FC = ({ children }) => {
  const [currentPokemonName, setCurrentPokemonName] = useState<string | null>();
  const {
    loading: loadingPokemons,
    data: pokemonNames,
    error: pokemonNamesError,
  } = useAllPokemonQuery();
  const {
    loading: loadingPokemon,
    error: pokemonError,
    data: currentPokemon,
  } = useGetPokemonQuery(currentPokemonName);
  return (
    <PokemonsContext.Provider
      value={{
        loadingPokemons,
        loadingPokemon,
        pokemonNames,
        setCurrentPokemonName,
        currentPokemon,
        error: pokemonNamesError || pokemonError,
      }}
    >
      {children}
    </PokemonsContext.Provider>
  );
};
