import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Button, Title } from '../styled/layout';
import { COLORS, SPACING } from '../styled/shared';
import { Pokemon, PokemonMove } from '../types';

export interface PokemonStatsInterface {
  pokemon?: Pokemon | null;
  loading?: boolean;
  onPokemonSelected: (pokemon: Pokemon, selectedMoves: PokemonMove[]) => void;
}

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  gap: ${SPACING * 2}px;
`;

const PokemonDescription = styled.div`
  max-width: ${SPACING * 18}px;
  flex: 1 0 auto;
`;

const PokemonImage = styled.img`
  height: ${SPACING * 12}px;
`;

const PokemonName = styled.p`
  color: ${COLORS.blue};
  text-transform: uppercase;
  margin-top: ${SPACING}px;
  margin-bottom: ${SPACING}px;
`;

const Subtitle = styled.h3`
  color: ${COLORS.blue};
  text-transform: uppercase;
  display: block;
  margin-top: 0;
  margin-bottom: ${SPACING}px;
  text-align: center;
  font-size: 14px;
`;

const Stat = styled.p`
  color: ${COLORS.yellow};
  margin-bottom: ${SPACING}px;
  width: 50%;
  text-transform: uppercase;
  font-size: 14px;
  text-align: right;
`;

const StatValue = styled.span`
  color: ${COLORS.blue};
  font-size: 20px;
`;

const StatsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const MoveListGroups = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  overflow: auto;
  min-width: ${SPACING * 23}px;
  max-height: ${SPACING * 32}px;
`;

const MoveList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  color: blue;
`;

const SelectedMoves = styled.ol`
  display: flex;
  gap: ${SPACING}px;
  flex-wrap: wrap;
  list-style: none;
`;

const SelectedMove = styled.li`
  border: 1px solid ${COLORS.blue};
  box-sizing: border-box;
  width: calc(50% - ${SPACING / 2}px);
`;

const MAX_MOVES = 4;

export const PokemonStats = ({
  loading,
  pokemon,
  onPokemonSelected,
}: PokemonStatsInterface) => {
  const stats: Pokemon['stats'] = pokemon?.stats || ({} as Pokemon['stats']);
  const [selectedMoves, setSelectedMoves] = useState<PokemonMove[]>([]);
  useEffect(() => {
    setSelectedMoves([]);
  }, [pokemon]);
  return (
    <Wrapper>
      <PokemonDescription>
        {loading && <p>Loading</p>}
        {pokemon && (
          <>
            {!loading && pokemon?.name && (
              <>
                <PokemonImage src={pokemon.image} />
                <PokemonName>{pokemon.name}</PokemonName>
                <Button
                  secondary
                  onClick={() => onPokemonSelected(pokemon, selectedMoves)}
                >
                  Save Pokemon
                </Button>
              </>
            )}
          </>
        )}
      </PokemonDescription>
      <div>
        <Subtitle>Stats</Subtitle>
        <StatsWrapper>
          <Stat>
            Speed <StatValue>{stats.speed || '-'}</StatValue>
          </Stat>
          <Stat>
            Special-Defense <StatValue>{stats.specialDefense || '-'}</StatValue>
          </Stat>
          <Stat>
            Special-Attack <StatValue>{stats.specialAttack || '-'}</StatValue>
          </Stat>
          <Stat>
            Defense <StatValue>{stats.defense || '-'}</StatValue>
          </Stat>
          <Stat>
            Attack <StatValue>{stats.attack || '-'}</StatValue>
          </Stat>
          <Stat>
            HP <StatValue>{stats.hp || '-'}</StatValue>
          </Stat>
        </StatsWrapper>
        <Subtitle>Selected moves</Subtitle>
        <SelectedMoves>
          {selectedMoves.map((move) => (
            <SelectedMove
              key={move.name}
              onClick={() => {
                const newMoves = [...selectedMoves].filter(
                  (newMove) => newMove.name !== move.name
                );
                setSelectedMoves(newMoves);
              }}
            >
              <small>{move.learnMethod}</small> <p>{move.name}</p>
            </SelectedMove>
          ))}
        </SelectedMoves>
      </div>
      <MoveListGroups>
        {Object.entries(pokemon?.availableMoves || {}).map(
          ([learnMethod, moves]) => (
            <li key={learnMethod}>
              <Title>{learnMethod}</Title>
              <MoveList>
                {moves.map((move) => (
                  <li
                    key={move.name}
                    onClick={() => {
                      let newMoves = [...selectedMoves];
                      if (
                        newMoves.find((newMove) => newMove.name === move.name)
                      ) {
                        newMoves = newMoves.filter(
                          (newMove) => newMove.name !== move.name
                        );
                      } else if (Object.keys(newMoves).length < MAX_MOVES) {
                        newMoves.push(move);
                      }
                      setSelectedMoves(newMoves);
                    }}
                  >
                    {move.name}
                  </li>
                ))}
              </MoveList>
            </li>
          )
        )}
      </MoveListGroups>
    </Wrapper>
  );
};
