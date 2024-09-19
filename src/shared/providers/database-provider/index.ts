import { PGDatabaseConnectionProvider, PGPromise } from "./implementations";

export * from "./interfaces";

const providers = {
  pgPromise: PGPromise,
  pg: PGDatabaseConnectionProvider,
};

export const DatabaseConnectionProvider =
  providers[process.settings.providers.database];
