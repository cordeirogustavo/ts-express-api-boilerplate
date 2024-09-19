import { PGDatabaseProvider, PGPromise } from "./implementations";

export * from "./interfaces";

const providers = {
  pgPromise: PGPromise,
  pg: PGDatabaseProvider,
};

export const DatabaseConnectionProvider =
  providers[process.settings.providers.database];
