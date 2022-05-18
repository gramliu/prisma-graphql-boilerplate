import { UserInputError } from 'apollo-server-errors'
import { hash } from 'bcrypt'
import { Context } from '@src/context'

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
): Promise<boolean> => {
  const existingUser = await context.prisma.user.findFirst({
    where: { email },
  })

  if (existingUser != null) {
    throw new UserInputError('Email already in use')
  }

  const passwordHash = await hash(password, 10)
  try {
    const prismaUser = await context.prisma.user.create({
      data: {
        email,
        password: passwordHash,
        name,
        address,
      },
    })

    const user = User(prismaUser)

    return true;
  } catch (err) {
    console.error(err)
    return false
  }
}
