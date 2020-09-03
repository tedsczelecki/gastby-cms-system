import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    myVenues: [Venue]
    getVenue(id: Int!): Venue
  }
  
  extend type Mutation {
    createVenue(input: VenueInput!): Venue
    deleteVenue(id: Int!): SuccessResponse
    updateVenue(id: Int!, input: VenueInput!): Venue
  }
  
  type Venue {
    id: Int!
    name: String!
    address: String!
    description: String
    createdAt: Date
    lat: String
    lng: String
    googlePlaceId: String,
    googleFormattedAddress: String,
    logo: File
  }
  
  input VenueInput { 
    name: String!
    address: String!
    description: String
    logo: FileInput
  }
`
