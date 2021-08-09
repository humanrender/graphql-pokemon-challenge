import ApolloClient, { gql } from 'apollo-boost';

export const ALL_POKEMON = gql`
  query ALL_POKEMON {
    Pokemons(first: 151) {
      name
    }
  }
`;

export const GET_POKEMON = gql`
  query POKEMON($pokemon: String!) {
    Pokemon(name: $pokemon) {
      id
      name
      image
      types {
        name
      }
      abilities {
        name
      }
      stats {
        name
        value
      }
      moves {
        name
        learnMethod
      }
    }
  }
`;

export default new ApolloClient({
  uri: process.env.REACT_APP_POKE_ENDPOINT,
});
