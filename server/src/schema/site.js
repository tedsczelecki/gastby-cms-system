import { gql } from 'apollo-server-express';

export default gql`
    extend type Query {
        mySites: [Site]
        getSite(id: Int!): Site
        getActiveSiteTemplate: [SiteTemplate]
    }
    
    extend type Mutation {
        createSite(input: SiteInput!): Site
        publishSite(id: Int): Site
        updateSite(id: Int!, input: SiteInput!): Site
    }

    type Site {
        id: Int
        url: String
        name: String
        status: String
        previewUrl: String
        pages: [Page]
    }
    
    type SiteTemplate {
        name: String
        label: String
        dataForm: String
    }
  
  input SiteInput {
      id: Int
      url: String
      name: String
      status: String
  }
  
`
