import express, { Request } from 'express'
import 'graphql-import-node'
import dotenv from 'dotenv'
import { Context, context } from './context'
import { ApolloServer } from 'apollo-server-express'
import { typeDefs, resolvers } from './modules'
import { verifyJWT } from './modules/users/util/jwt'
import { GraphQLError } from 'graphql'

/**
 * Create a new context, given an incoming HTTP request
 * @param { req } Request an Express Request object
 * @returns a new Context object
 */
function contextCreator({ req }: { req: Request }): Context {
  const headers = req?.headers
  const newContext = { ...context, headers } as Context

  if (headers && headers['x-access-token']) {
    // Extract id from JWT, if present
    const accessToken = headers['x-access-token'] as string
    const id = verifyJWT(accessToken)?.id
    newContext['currentUserId'] = id
  }

  return context
}

// Load environment
dotenv.config()
const PORT = process.env.PORT || 4000

async function main() {
  await context.prisma.$connect()

  const app = express()

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    debug: process.env.DEBUG === 'true',
    context: contextCreator,
    formatError: (error: GraphQLError) => {
      console.error(error)
      return error
    },
  })

  await server.start()

  server.applyMiddleware({ app, path: '/' })
  app.listen(PORT, () => console.log(`Server ready on port ${PORT}`))
}

main()
  .catch(console.error)
  .finally(async () => {
    await context.prisma.$disconnect()
  })
