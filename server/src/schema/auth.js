import { gql } from 'apollo-server-express';

export default gql`
    extend type Query {
        authUrls: AuthUrls
    }
    
    extend type Mutation {
        forgotPassword(email: String!): SuccessResponse
        register(name: String!, email: String!, password: String!): Token
        registerGoogle(code: String!): Token
        resetPassword(password: String!, confirmPassword: String!, token: String): SuccessResponse
    }

    type AuthUrls {
        googleUrl: String
    }
    
  type SuccessResponse {
      success: Boolean
      message: String
  }
    
`;

