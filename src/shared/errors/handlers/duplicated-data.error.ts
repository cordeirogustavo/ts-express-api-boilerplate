import { CustomErrorCodes, HttpStatusCodes } from "../enums";

import { BaseExceptionHandler } from "./base.error";
import { IBaseExceptionHandler } from "../interfaces";
import { IRequest, IResponse } from "@/shared/interfaces";

export class DuplicatedDataHandler
  extends BaseExceptionHandler
  implements IBaseExceptionHandler
{
  code = CustomErrorCodes.DUPLICATED_DATA;

  httpCode = HttpStatusCodes.CONFLICT;

  constructor(message?: string) {
    super(message || "This item is previously registered");
  }

  override handle(
    err: unknown,
    request: IRequest<any>,
    response: IResponse
  ): IResponse {
    return super.handle(err, request, response);
  }
}
