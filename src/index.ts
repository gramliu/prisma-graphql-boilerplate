import express from 'express'
import "graphql-import-node"
import dotenv from "dotenv"
import { context } from "./context"
import { ApolloServer } from 'apollo-server-express'

dotenv.config()
const DB_URI = process.env.DB_URI
const PORT = process.env.PORT || 4000

context.prisma.$connect().then(() => {
  const app = express()

  const server = new ApolloServer({
    
  })

})
.catch(console.error)
.finally(async () => {
  await context.prisma.$disconnect()
})