import { Context } from "../../../_types/context"
import { User } from "../../../_types/user"

/**
 * Return the currently logged in user
 */
export default async (
  _root: undefined,
  _args: undefined,
  context: Context
): Promise<User> => {
  return await context.database.users.findOne({ _id: context.currentUserId })
}
