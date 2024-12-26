import { gql } from "@apollo/client";

export const GET_POKEMON = gql`
  query pokemon($name: String!) {
    pokemon(name: $name) {
      id
      number
      name
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      types
      resistant
      attacks {
        fast {
          name
          type
          damage
        }
        special {
          name
          type
          damage
        }
      }
      weaknesses
      fleeRate
      maxCP
      evolutions {
        ...PokemonFragment
      }
      evolutionRequirements {
        amount
        name
      }
      maxHP
      image
    }
  }

  fragment PokemonFragment on Pokemon {
    id
    name
    image
    number
    evolutionRequirements {
      amount
      name
    }
  }
`;
