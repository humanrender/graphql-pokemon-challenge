import ApolloClient, { gql } from 'apollo-boost';

export const ALL_POKEMON = gql`
  query ALL_POKEMON {
    Pokemons(first: 151) {
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
    }
  }
`;

export default new ApolloClient({
  uri: process.env.REACT_APP_POKE_ENDPOINT,
});
