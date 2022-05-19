import { gql } from 'apollo-server-express'
import posts from './posts'
import users from './users'

const emptyDefs = gql`
  type Query
  type Mutation
  scalar Date
`

export const resolvers = [users.resolvers, posts.resolvers]
export const typeDefs = [emptyDefs, users.typeDefs, posts.typeDefs]
