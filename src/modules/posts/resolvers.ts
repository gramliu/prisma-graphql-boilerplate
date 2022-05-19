import { Comment, Post } from '@prisma/client'
import { Context } from '@src/context'

export default {
  Comment: {
    post: async (comment: Comment, _args: {}, context: Context) => {
      return context.prisma.post.findUnique({
        where: {
          id: comment.postId,
        },
      })
    },
    author: async (comment: Comment, _args: {}, context: Context) => {
      return context.prisma.user.findUnique({
        where: {
          id: comment.authorId,
        },
      })
    },
  },
}
