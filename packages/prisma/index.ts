import { PrismaClient } from "@prisma/client";
import { PrismaPlanetScale } from "@prisma/adapter-planetscale";
import { Client } from "@planetscale/database";

const client = new Client({ url: process.env.DATABASE_URL });
const adapter = new PrismaPlanetScale(client);

export const prisma =
  global.prisma ||
  new PrismaClient({
    adapter,
    omit: {
      user: { passwordHash: true },
    },
  });

declare global {
  var prisma:
    | PrismaClient<{ omit: { user: { passwordHash: true } } }>
    | undefined;
}

if (process.env.NODE_ENV === "development") global.prisma = prisma;
