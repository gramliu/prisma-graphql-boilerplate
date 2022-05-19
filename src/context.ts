import { PrismaClient } from '@prisma/client'

export interface Context {
  prisma: PrismaClient
  headers?: any
  currentUserId?: string
}