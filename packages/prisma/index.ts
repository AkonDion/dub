import { PrismaClient } from "@prisma/client";
import { PrismaPlanetScale } from "@prisma/adapter-planetscale";
import { Client } from "@planetscale/database";

const client = new Client({
  url: process.env.DATABASE_URL,
  fetch: (url, init) => {
    return fetch(url, {
      ...init,
      cache: "no-store",
    });
  },
  ssl: {
    rejectUnauthorized: true,
    minVersion: 'TLSv1.2',
    maxVersion: 'TLSv1.3'
  }
});
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
