import path from "node:path";
import type { PrismaConfig } from "prisma";

export default {
    schema: path.join("db", "schema.prisma"),
    migrations: {
        seed: "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.js",
    },
    views: {
        path: path.join("db", "views"),
    },
    typedSql: {
        path: path.join("db", "queries"),
    }
} satisfies PrismaConfig;
