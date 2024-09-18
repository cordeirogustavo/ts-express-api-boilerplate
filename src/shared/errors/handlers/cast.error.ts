import { IRequest, IResponse } from "@/shared/interfaces";
import { CustomErrorCodes, HttpStatusCodes } from "../enums";
import { BaseExceptionHandler } from "./base.error";

export class CastErrorHandler extends BaseExceptionHandler {
  code = CustomErrorCodes.CAST_ERROR;

  httpCode = HttpStatusCodes.CLIENT_ERROR;

  constructor(message?: string) {
    super(
      message
        ? `Cast error: ${message}`
        : "Cast error. Check your parameters and try again"
    );
  }

  override handle(
    err: unknown,
    request: IRequest<any>,
    response: IResponse
  ): IResponse {
    return super.handle(err, request, response);
  }
}
