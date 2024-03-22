import { PrismaClient } from '@prisma/client';

declare global {
    
}

export const db = globalThis.prisma || new PrismaClient();
