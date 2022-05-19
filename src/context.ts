import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export interface Context {
  prisma: PrismaClient
  headers?: any
  currentUserId?: string
}

export const context: Context = {
  prisma: prisma,
}
