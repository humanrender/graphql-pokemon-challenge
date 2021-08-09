import React, { useContext, useState } from 'react';
import styled from 'styled-components';

import { PokemonSelector } from './PokemonSelector';
import { PokemonStats } from './PokemonStats';
import { PokemonsContext } from '../providers/PokemonsProvider';
import { Title } from '../styled/layout';
import { SPACING, COLORS } from '../styled/shared';
import { PokemonTeam, SelectedPokemon } from './PokemonTeam';

const PlannerWrapper = styled.section`
  min-height: ${SPACING * 32}px;
  display: flex;
`;

const SelectorWrapper = styled.div`
  max-width: ${SPACING * 24}px;
`;

const StatsWrapper = styled.div`
  flex-grow: 1;
  margin-left: ${SPACING * 2}px;
`;

const Feedback: React.FC<{ error?: boolean }> = ({ children, error }) => (
  <Title color={error ? COLORS.red : COLORS.yellow}>{children}</Title>
);

export const PokemonTeamPlanner = () => {
  const [pokemonTeam, setPokemonTeam] = useState<SelectedPokemon[]>(
    [] as SelectedPokemon[]
  );
  const {
    loadingPokemons,
    loadingPokemon,
    pokemonNames,
    error,
    currentPokemon,
    setCurrentPokemonName,
  } = useContext(PokemonsContext);

  return (
    <article>
      {loadingPokemons && <Feedback>Gotta load 'em all</Feedback>}
      {error && <Feedback error>{JSON.stringify(error)}</Feedback>}
      {!loadingPokemons && pokemonNames && (
        <>
          <PlannerWrapper>
            <SelectorWrapper>
              <PokemonSelector
                onChange={(pokemon) => {
                  setCurrentPokemonName(pokemon);
                }}
              />
            </SelectorWrapper>
            <StatsWrapper>
              <PokemonStats
                pokemon={currentPokemon}
                loading={loadingPokemon}
                onPokemonSelected={(pokemon, selectedMoves) =>
                  setPokemonTeam([...pokemonTeam, { pokemon, selectedMoves }])
                }
              />
            </StatsWrapper>
          </PlannerWrapper>
          <PokemonTeam pokemons={pokemonTeam} />
        </>
      )}
    </article>
  );
};
