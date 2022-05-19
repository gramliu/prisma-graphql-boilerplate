import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET || 'super_secret_string!'

/**
 * Generate a JWT for the given id
 * @param id string to generate the JWT for
 * @returns a JWT string
 */
export function generateJWT(id: string) {
  return jwt.sign({ id }, SECRET)
}

/**
 * Decode a JWT and return the data
 * @param token JWT to decode
 * @returns decoded information from the JWT
 */
export function verifyJWT(token: string): {
  id: string
  iat: number
  exp: number
} | null {
  try {
    return jwt.verify(token, SECRET) as { id: string; iat: number; exp: number }
  } catch {
    return null
  }
}
