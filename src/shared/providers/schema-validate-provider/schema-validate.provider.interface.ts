import { Request } from "express";

export interface ISchemaValidateProvider {
  valid(schema: any, request: Request): Promise<any>;
}
