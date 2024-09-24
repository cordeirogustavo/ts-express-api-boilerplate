import { DependencyContainer } from "tsyringe";

import { IContainer } from "@/shared/interfaces";

import { DatabaseConnectionProvider } from "./database-provider";
import { IDatabaseConnectionProvider } from "./database-provider/interfaces";
import { ProvidersSymbols } from "./providers.symbols";

import { SchemaValidateProvider } from "./schema-validate-provider";
import { ISchemaValidateProvider } from "./schema-validate-provider/schema-validate.provider.interface";
import {
  GoogleAuthProvider,
  IGoogleAuthProvider,
} from "./google-auth-provider";
import {
  FacebookAuthProvider,
  IFacebookAuthProvider,
} from "./facebook-auth-provider";

export class ProvidersContainer implements Partial<IContainer> {
  static register(container: DependencyContainer): void {
    container.register<ISchemaValidateProvider>(
      ProvidersSymbols.SchemaValidadeProvider,
      SchemaValidateProvider
    );
    container.register<IGoogleAuthProvider>(
      ProvidersSymbols.GoogleAuthProvider,
      GoogleAuthProvider
    );
    container.register<IFacebookAuthProvider>(
      ProvidersSymbols.FacebookAuthProvider,
      FacebookAuthProvider
    );
    container.register<IDatabaseConnectionProvider>(
      ProvidersSymbols.DatabaseConnectionProvider,
      {
        useValue: new DatabaseConnectionProvider(),
      }
    );
  }
}
