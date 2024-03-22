import { PrismaClient } from '@prisma/client';

declare global {
    prisma = PrismaClient;
}

export const db = globalThis.prisma || new PrismaClient();
