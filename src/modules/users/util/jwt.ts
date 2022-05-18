import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET || 'super_secret_string!'

export function generateJWT(id: string) {
  return jwt.sign({ id }, SECRET)
}

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
