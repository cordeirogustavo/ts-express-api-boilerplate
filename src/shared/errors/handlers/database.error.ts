import { BaseExceptionHandler } from "./base.error";

import { CustomErrorCodes, HttpStatusCodes } from "../enums";
import { IRequest, IResponse } from "@/shared/interfaces";

export class DatabaseErrorHandler extends BaseExceptionHandler {
  code = CustomErrorCodes.DATABASE_ERROR_UNKNOWN;

  httpCode = HttpStatusCodes.DATABASE_ERROR;

  constructor(message?: string) {
    super(message || "Database error. Please contact an admin");
  }

  override handle(
    err: unknown,
    request: IRequest<any>,
    response: IResponse
  ): IResponse {
    return super.handle(err, request, response);
  }
}
