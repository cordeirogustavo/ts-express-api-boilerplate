import { IRequest, IResponse } from "@/shared/interfaces";
import { CustomErrorCodes, HttpStatusCodes } from "../enums";

import { BaseExceptionHandler } from "./base.error";

export class UnhandledError extends BaseExceptionHandler {
  code = CustomErrorCodes.UNKNOWN_ERROR;

  httpCode = HttpStatusCodes.BAD_REQUEST;

  constructor(message?: string) {
    super(message || "An unknown error occurred on server.");
  }

  override handle(
    err: unknown,
    request: IRequest<any>,
    response: IResponse
  ): IResponse {
    // Unhandled exceptions are logged as errors
    // We have to log on logger first, so we have error details before formating to caller
    // process.logger.fatal(this.addTraceIdToLog(err, request.headers.traceId));
    console.log(err);
    // slack.notify(err, req)

    return super.handle(err, request, response);
  }
}
