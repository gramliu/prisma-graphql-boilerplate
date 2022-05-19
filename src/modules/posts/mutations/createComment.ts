import { Comment } from '@prisma/client'
import { Context } from '@src/context'
import { AuthenticationError, UserInputError } from 'apollo-server-errors'

/**
 * Create a comment on a post
 */
export default async (
  _root: undefined,
  {
    postId,
    text,
  }: {
    postId: string
    text: string
  },
  context: Context,
): Promise<Comment> => {
  // Assert that the user is authenticated
  const authorId = context.currentUserId

  if (authorId == null) {
    throw new AuthenticationError('Not authenticated')
  }

  // Check if the post exists
  const post = await context.prisma.post.findUnique({
    where: {
      id: postId,
    },
  })

  if (post == null) {
    throw new UserInputError('Post does not exist!')
  }

  // Create the comment
  const comment = await context.prisma.comment.create({
    data: {
      text,
      authorId,
      postId,
    },
  })

  return comment
}
