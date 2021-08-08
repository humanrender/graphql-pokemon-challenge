import * as React from 'react';

import { useAllPokemonQuery } from '../hooks/useAllPokemonQuery';

export const PokemonTeamPlanner = () => {
  const { loading, data, error } = useAllPokemonQuery();
  return <pre>{JSON.stringify(data, null, '\t')}</pre>;
};
