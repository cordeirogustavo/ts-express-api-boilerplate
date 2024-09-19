import { IRequest, IResponse } from "@/shared/interfaces";
import { CustomErrorCodes, HttpStatusCodes } from "../enums";
import { BaseExceptionHandler } from "./base.error";

export class NoAffectedDataHandler extends BaseExceptionHandler {
  code = CustomErrorCodes.NO_CUSTOMER_FOUND;

  httpCode = HttpStatusCodes.NOT_FOUND;

  constructor(message?: string) {
    super(message || " Not affected data. Check your parameters and try again");
  }

  override handle(
    err: unknown,
    request: IRequest<any>,
    response: IResponse
  ): IResponse {
    return super.handle(err, request, response);
  }
}
