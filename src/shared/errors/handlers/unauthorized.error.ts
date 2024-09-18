import { IRequest, IResponse } from "@/shared/interfaces";
import { CustomErrorCodes, HttpStatusCodes } from "../enums";
import { BaseExceptionHandler } from "./base.error";

export class UnauthorizedDataHandler extends BaseExceptionHandler {
  code = CustomErrorCodes.NOT_AUTHORIZED;

  httpCode = HttpStatusCodes.UNAUTHORIZED;

  constructor(message?: string) {
    super(message || "Unauthorized");
  }

  override handle(
    err: unknown,
    request: IRequest<any>,
    response: IResponse
  ): IResponse {
    return super.handle(err, request, response);
  }
}
