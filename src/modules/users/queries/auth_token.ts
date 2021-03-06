import { Context } from '@src/context'
import { AuthenticationError, UserInputError } from 'apollo-server-errors'
import { compare } from 'bcrypt'
import { generateJWT } from '../util/jwt'

/**
 * Login a user and retrieve a JWT authentication token
 */
export default async (
  _root: undefined,
  {
    email,
    password,
  }: {
    email?: string
    password: string
  },
  context: Context,
): Promise<string> => {
  // Search for the user
  const user = await context.prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (user == null) {
    throw new UserInputError('User not found')
  }

  // Check if the password is correct
  const isValidPassword = await compare(password, user.password)
  if (!isValidPassword) {
    throw new AuthenticationError('Invalid password')
  }

  // Generate a JWT
  return generateJWT(user.id)
}
