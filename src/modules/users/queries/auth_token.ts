import { AuthenticationError, UserInputError } from "apollo-server-errors"
import { compare } from "bcrypt"
import { generateJWT } from "../../../utils/verifyJWT"
import { Context } from "../../../_types/context"
import { User } from "../../../_types/user"

/**
 * Login a user
 */
export default async (
  _root: undefined,
  {
    email,
    password,
    username,
  }: {
    email?: string
    password: string
    username?: string
  },
  context: Context
): Promise<string> => {
  let user: User
  if (email) {
    user = await context.database.users.findOne({ email })
  } else if (username) {
    user = await context.database.users.findOne({ username })
  } else {
    throw new UserInputError("Must specify either email or username!")
  }

  if (!user) {
    throw new UserInputError("User not found!")
  }

  const valid = await compare(password, user.password)
  if (!valid) {
    throw new AuthenticationError("Incorrect password!")
  }

  return generateJWT(user._id.toHexString())
}
