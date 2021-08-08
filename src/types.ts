export interface PokemonStats {
  hp: number | null;
  attack: number | null;
  defense: number | null;
  specialAttack: number | null;
  specialDefense: number | null;
  speed: number | null;
}

export interface Pokemon {
  id: string;
  name: string;
  image: string;
  type: string;
  abilities: string[];
  stats: PokemonStats;
}
