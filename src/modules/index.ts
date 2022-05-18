import { gql } from "apollo-server-express"

const emptyDefs = gql`
  type Query
  type Mutation
  scalar Date
`
