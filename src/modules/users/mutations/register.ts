import { UserInputError } from 'apollo-server-errors'
import { hash } from 'bcrypt'
import { Context } from '@src/context'
import { generateJWT } from '../util/jwt'

/**
 * Register a new user
 */
export default async (
  _root: undefined,
  {
    email,
    password,
    name,
    street,
    city,
    country,
  }: {
    email: string
    password: string
    name?: string
    street: string
    city: string
    country: string
  },
  context: Context,
): Promise<string> => {
  // Check if the user already exists
  const existingUser = await context.prisma.user.findFirst({
    where: { email },
  })

  if (existingUser != null) {
    throw new UserInputError('Email already in use')
  }

  // Hash the password
  const passwordHash = await hash(password, 10)
  const user = await context.prisma.user.create({
    data: {
      email,
      password: passwordHash,
      name,
      address: {
        street,
        city,
        country,
      },
    },
  })

  // Generate a JWT
  return generateJWT(user.id)
}
