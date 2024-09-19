import { NextFunction, Request, Response } from "express";
import { SchemaValidateProvider } from "@/shared/providers/schema-validate-provider";
import { container } from "tsyringe";

export function schemaValidateMiddleware(schema: any) {
  const valid = async (
    request: Request,
    _response: Response,
    next: NextFunction
  ) => {
    const schemaValidateProvider = container.resolve(SchemaValidateProvider);
    await schemaValidateProvider.valid(schema, request);
    return next();
  };
  return valid;
}
