import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    getMyFiles: [File]
    getFileById(id: ID!): File
  }

  extend type Mutation {
    uploadFile(file: Upload!): File
    uploadFiles(files: [Upload]!): [File]
  }

  type File {
    alt: String
    aspectRatio: String
    id: ID
    meta: String
    name: String
    orientation: String
    sourceUrl: String
    title: String
    url: String
    user: User
  }
  

  input FileInput {
    id: ID
    alt: String
    filename: String
    meta: String
    mimetype: String
    path: String
    title: String
    url: String
  }

`;
