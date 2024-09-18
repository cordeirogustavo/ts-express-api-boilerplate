import { ZodSchemaValidateProvider } from "./zod-schema-validate.provider";

const providers = {
  zod: ZodSchemaValidateProvider,
};

const SchemaValidateProvider = providers["zod"];

export { SchemaValidateProvider };
