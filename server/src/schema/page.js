import { gql } from 'apollo-server-express';

export default gql`
    extend type Query {
        mySitePages: [Page]
        getPage(id: Int!): Page
    }
    
    extend type Mutation {
        createPage(input: PageInput): Page
        updatePage(id: Int, input: PageInput): Page
    }

    type Page {
        id: Int
        parentId: Int
        url: String
        title: String
        content: String
        heroImage: File
        template: String
        status: String
        meta: PageMeta
        data: [PageData]
    }
  
    type PageMeta {
        title: String
        description: String
        custom: String
    }

    type PageData {
        key: String
        value: String
    }
  
  input PageInput {
      parentId: Int
      url: String
      title: String
      content: String
      heroImage: FileInput
      status: String
      template: String
      meta: PageMetaInput
      data: [PageDataInput]
  }
  
  input PageMetaInput {
      title: String
      description: String
      custom: String
  }

    input PageDataInput {
        key: String
        value: String
    }

`
