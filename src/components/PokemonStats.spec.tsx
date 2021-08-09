import * as React from 'react';
import renderer from 'react-test-renderer';

import { PokemonStats } from './PokemonStats';

describe('PokemonStats', () => {
  describe('without pokemon', () => {
    it('should render the default view', () => {
      const onPokemonSelected = jest.fn();
      const tree = renderer
        .create(
          <PokemonStats pokemon={null} onPokemonSelected={onPokemonSelected} />
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  describe('with a pokemon', () => {
    it('should render the default view', () => {
      const onPokemonSelected = jest.fn();
      const tree = renderer
        .create(
          <PokemonStats
            pokemon={{
              id: '143',
              name: 'snorlax',
              image:
                'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/143.png',
              type: 'normal',
              abilities: ['immunity', 'thick-fat', 'gluttony'],
              availableMoves: {
                machine: [{ name: 'defense-curl', learnMethod: 'machine' }],
              },
              stats: {
                hp: 123,
                defense: 234,
                attack: 345,
                speed: 456,
                specialAttack: 567,
                specialDefense: 678,
              },
            }}
            onPokemonSelected={onPokemonSelected}
          />
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  describe('when loading', () => {
    it('should render the loading view', () => {
      const onPokemonSelected = jest.fn();
      const tree = renderer
        .create(
          <PokemonStats
            pokemon={null}
            onPokemonSelected={onPokemonSelected}
            loading
          />
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
