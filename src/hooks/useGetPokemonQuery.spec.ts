import { normalizePokemonData, PokemonResponse } from './useGetPokemonQuery';

describe('useGetPokemonQuery normalization', () => {
  describe('With an empty response', () => {
    it('should return an empty object', () => {
      expect(normalizePokemonData(undefined)).toMatchObject({});
    });
  });
  describe('With valid data', () => {
    const SAMPLE_DATA: PokemonResponse['Pokemon'] = {
      id: '143',
      name: 'snorlax',
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/143.png',
      types: [
        {
          name: 'normal',
        },
      ],
      abilities: [
        {
          name: 'immunity',
        },
        {
          name: 'thick-fat',
        },
        {
          name: 'gluttony',
        },
      ],
      moves: [{ name: 'defense-curl', learnMethod: 'machine' }],
      stats: [
        { name: 'hp', value: 123 },
        { name: 'defense', value: 234 },
        { name: 'attack', value: 345 },
        { name: 'speed', value: 456 },
        { name: 'special-attack', value: 567 },
        { name: 'special-defense', value: 678 },
      ],
    };
    it('should parse the data from GraphQL', () => {
      expect(normalizePokemonData(SAMPLE_DATA)).toMatchObject({
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
      });
    });
  });
});
