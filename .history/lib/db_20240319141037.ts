import { PrismaClient } from '@prisma/client';

declare global {
    var prisma: PrismaClient;
}

export const db = globalThis.prisma || new PrismaClient();
if()
