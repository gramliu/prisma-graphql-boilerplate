import { Post } from '@prisma/client'
import { Context } from '@src/context'
import { AuthenticationError } from 'apollo-server-errors'

/**
 * Create a new post
 */
export default async (
  _root: undefined,
  {
    title,
    body,
  }: {
    title: string
    body: string
  },
  context: Context,
): Promise<Post> => {
  // Assert that the user is authenticated
  const authorId = context.currentUserId

  if (authorId == null) {
    throw new AuthenticationError('Not authenticated')
  }

  // Create the post
  const post = await context.prisma.post.create({
    data: {
      title,
      body,
      authorId,
    },
  })

  return post
}
