import { PrismaClient } from '@prisma/client';

const db = globalThis.prisma || new PrismaClient();
