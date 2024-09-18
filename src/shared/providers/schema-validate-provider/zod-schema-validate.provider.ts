import { Request } from "express";
import { singleton } from "tsyringe";
import { AnyZodObject, z } from "zod";
import { ISchemaValidateProvider } from "./schema-validate.provider.interface";

@singleton()
export class ZodSchemaValidateProvider implements ISchemaValidateProvider {
  public async valid<T extends AnyZodObject>(
    schema: T,
    request: Request
  ): Promise<z.infer<T>> {
    request.parsed = await schema.parseAsync(request);
    return request;
  }
}
