import { User } from '@prisma/client'
import { Context } from '@src/context'
import { AuthenticationError, UserInputError } from 'apollo-server-express'

/**
 * Return the user logged in the curent context
 */
export default async (
  _root: undefined,
  _args: undefined,
  context: Context,
): Promise<User> => {
  // Assert that the user is authenticated
  if (context.currentUserId == null) {
    throw new AuthenticationError('Missing authentication token')
  } else {
    // Find the user associated with the current user id
    const user = await context.prisma.user.findUnique({
      where: { id: context.currentUserId },
    })

    if (user == null) {
      throw new UserInputError('User not found')
    }

    return user
  }
}
