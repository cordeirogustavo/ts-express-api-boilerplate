import { DependencyContainer } from "tsyringe";

import { IContainer } from "@/shared/interfaces";

import { DatabaseConnectionProvider } from "./database-provider";
import { IDatabaseConnectionProvider } from "./database-provider/interfaces";
import { ProvidersSymbols } from "./providers.symbols";

import { SchemaValidateProvider } from "./schema-validate-provider";
import { ISchemaValidateProvider } from "./schema-validate-provider/schema-validate.provider.interface";

export class ProvidersContainer implements Partial<IContainer> {
  static register(container: DependencyContainer): void {
    container.register<ISchemaValidateProvider>(
      ProvidersSymbols.SchemaValidadeProvider,
      SchemaValidateProvider
    );
    container.register<IDatabaseConnectionProvider>(
      ProvidersSymbols.DatabaseConnectionProvider,
      {
        useValue: new DatabaseConnectionProvider(),
      }
    );
  }
}
