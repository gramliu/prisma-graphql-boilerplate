import { gql } from "apollo-server-express"
import users from "./users"

const emptyDefs = gql`
  type Query
  type Mutation
  scalar Date
`

export const resolvers = [users.resolvers]
export const typeDefs = [emptyDefs, users.typeDefs]