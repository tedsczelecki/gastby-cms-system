import { gql } from 'apollo-server-express';

export default gql`
    extend type Query {
        authUrls: AuthUrls
    }
    
    extend type Mutation {
        forgotPassword(email: String!): SuccessResponse
        register(input: RegisterInput!): Token
        registerGoogle(code: String!): Token
        resetPassword(password: String!, confirmPassword: String!, token: String): SuccessResponse
        signIn(email: String!, password: String!): Token!
    }

    type AuthUrls {
        googleUrl: String
    }
    
  type SuccessResponse {
      success: Boolean
      message: String
  }
  
  input RegisterInput {
      email: String!
      name: String!
      password: String!
  }
    
`;

