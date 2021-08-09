import { normalizePokemonData } from './useAllPokemonQuery';

describe('useAllPokemonQuery', () => {
  describe('without response', () => {
    it('should return an empty array', () => {
      expect(normalizePokemonData(undefined)).toMatchObject([]);
    });
  });
  describe('with a valid response', () => {
    it('should return a list of names', () => {
      expect(
        normalizePokemonData([{ name: 'snorlax' }, { name: 'pikachu' }])
      ).toMatchObject(['snorlax', 'pikachu']);
    });
  });
});
