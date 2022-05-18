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
    address,
  }: {
    email: string
    password: string
    name?: string
    address?: {
      street: string
      city: string
      country: string
    }
  },
  context: Context,
): Promise<string> => {
  const existingUser = await context.prisma.user.findFirst({
    where: { email },
  })

  if (existingUser != null) {
    throw new UserInputError('Email already in use')
  }

  const passwordHash = await hash(password, 10)
  const user = await context.prisma.user.create({
    data: {
      email,
      password: passwordHash,
      name,
      address,
    },
  })

  return generateJWT(user.id)
}
