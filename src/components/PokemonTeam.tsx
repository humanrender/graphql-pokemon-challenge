import * as React from 'react';
import styled from 'styled-components';

import { Title } from '../styled/layout';
import { SPACING, TYPE_COLORS, COLORS } from '../styled/shared';
import { Pokemon, PokemonMove } from '../types';

const TeamWrapper = styled.ol`
  display: flex;
  padding: 0;
  list-style: none;
  gap: ${SPACING}px;
`;

const ChosenPokemonWrapper = styled.li(
  ({ type = null }: { type: string | null }) => `
    height: ${SPACING * 31}px;
    background-color: ${
      type && TYPE_COLORS[type] ? TYPE_COLORS[type] : COLORS.grey
    }
    width: 20%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
 `
);

const EmptyPokemon = styled.p`
  color: ${COLORS.blue};
  text-align: center;
  width: 100%;
`;

const PokemonName = styled.p`
  color: ${COLORS.white};
  text-transform: uppercase;
  font-weight: bold;
  margin-top: 0;
  margin-bottom: ${SPACING}px;
`;

export interface SelectedPokemon {
  pokemon: Pokemon;
  selectedMoves: PokemonMove[];
}

export interface PokemonTeamProps {
  pokemons: SelectedPokemon[];
}

const ChosenPokemon = ({ pokemon, selectedMoves }: SelectedPokemon) => (
  <ChosenPokemonWrapper type={pokemon?.type || null}>
    {!pokemon && <EmptyPokemon>Empty</EmptyPokemon>}
    {pokemon && (
      <>
        <img src={pokemon.image} alt={pokemon.name} />
        <PokemonName>{pokemon.name}</PokemonName>
        <ol>
          {selectedMoves.map((move) => (
            <li key={move.name}>{move.name}</li>
          ))}
        </ol>
      </>
    )}
  </ChosenPokemonWrapper>
);

export const PokemonTeam = ({ pokemons }: PokemonTeamProps) => (
  <>
    <Title>Select Squad</Title>
    <TeamWrapper>
      <ChosenPokemon {...pokemons[0]} />
      <ChosenPokemon {...pokemons[1]} />
      <ChosenPokemon {...pokemons[2]} />
      <ChosenPokemon {...pokemons[3]} />
      <ChosenPokemon {...pokemons[4]} />
    </TeamWrapper>
  </>
);
