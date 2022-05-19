import { Post } from '@prisma/client'
import { Context } from '@src/context'
import { GraphQLResolveInfo } from 'graphql'

/**
 * Get a post given its ID
 */
export default async (
  _root: undefined,
  {
    id,
  }: {
    id: string
  },
  context: Context,
  info: GraphQLResolveInfo,
): Promise<Post | null> => {
  const post = await context.prisma.post.findUnique({
    where: {
      id,
    },
    include: {
      comments: true,
    },
  })

  return post
}
