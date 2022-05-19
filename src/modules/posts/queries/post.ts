import { Post } from '@prisma/client'
import { Context } from '@src/context'

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
): Promise<Post | null> => {
  const post = await context.prisma.post.findUnique({
    where: {
      id,
    },
  })

  return post
}
