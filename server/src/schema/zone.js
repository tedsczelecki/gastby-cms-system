import { gql } from 'apollo-server-express';
// extend type Query {
// }
//
// extend type Mutation {
//
// }
export default gql`
  
  
  type Zone {
    id: Int!
    name: String!
  }
  
  input ZoneInput {
    name: String!
  }
`
