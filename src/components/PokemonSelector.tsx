import Downshift from 'downshift';
import React, { useContext } from 'react';
import styled from 'styled-components';

import { PokemonsContext } from '../providers/PokemonsProvider';
import { TitleLikeStyles, Button } from '../styled/layout';
import { SPACING, COLORS } from '../styled/shared';

const Label = styled.label`
  ${TitleLikeStyles}
  margin-bottom: ${SPACING}px;
`;

const SearchBox = styled.input`
  padding: ${SPACING}px;
  display: block;
  width: 100%;
  box-sizing: border-box;
  border: 3px solid ${COLORS.blue};
  text-transform: uppercase;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  max-height: ${SPACING * 32}px;
`;

const List = styled.ul`
  padding: 0;
  flex: 0 1 auto;
  overflow-y: auto;
  margin-top: ${SPACING / 2}px;
  margin-bottom: 0;
`;

const ListItem = styled.li`
  list-style: none;
  margin-bottom: ${SPACING / 2}px;
`;

export interface PokemonSelectorProps {
  onChange: (pokemon: string | null) => void;
}

export const PokemonSelector = ({ onChange }: PokemonSelectorProps) => {
  const { loadingPokemons, pokemonNames } = useContext(PokemonsContext);
  return (
    <>
      {!loadingPokemons && (
        <Downshift onChange={onChange}>
          {({
            getLabelProps,
            getRootProps,
            getInputProps,
            getMenuProps,
            getItemProps,
            inputValue,
          }) => (
            <Wrapper>
              <Label {...getLabelProps()}>Select a Pokemon</Label>
              <div {...getRootProps(undefined, { suppressRefError: true })}>
                <SearchBox {...getInputProps()} />
              </div>
              <List {...getMenuProps()}>
                {pokemonNames
                  .filter(
                    (pokemonName) =>
                      !inputValue || pokemonName.includes(inputValue)
                  )
                  .map((pokemonName, index) => (
                    <ListItem
                      {...getItemProps({
                        index,
                        key: pokemonName,
                        item: pokemonName,
                      })}
                    >
                      <Button primary>{pokemonName}</Button>
                    </ListItem>
                  ))}
              </List>
            </Wrapper>
          )}
        </Downshift>
      )}
    </>
  );
};
