import { NextFunction, Request, Response } from "express";
import { SchemaValidateProvider } from "@/shared/providers/schema-validate-provider";
import { container } from "tsyringe";

export function schemaValidateMiddleware(schema: any) {
  const valid = async (
    request: Request,
    _response: Response,
    next: NextFunction
  ) => {
    try {
      const schemaValidateProvider = container.resolve(SchemaValidateProvider);

      await schemaValidateProvider.valid(schema, request);

      return next();
    } catch (err) {
      return next(err);
    }
  };

  return valid;
}
