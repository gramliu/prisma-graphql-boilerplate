import { PrismaClient } from '@prisma/client'

export interface Context {
  prisma: PrismaClient
  headers?: {
    [key: string]: string
  }
  currentUserId?: string
}