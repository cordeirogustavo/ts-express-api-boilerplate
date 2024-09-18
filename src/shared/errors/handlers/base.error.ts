import {
  IBaseExceptionHandler,
  IErrorBody,
  IErrorLogInfo,
} from "@/shared/errors/interfaces";
import { CustomErrorCodes, HttpStatusCodes } from "@/shared/errors/enums";
import { IRequest, IResponse } from "@/shared/interfaces";

export class BaseExceptionHandler
  extends Error
  implements IBaseExceptionHandler
{
  code = CustomErrorCodes.UNKNOWN_ERROR;

  httpCode = HttpStatusCodes.INTERNAL_SERVER_ERROR;

  type: string;

  traceId?: string;

  constructor(message?: string) {
    super(message);
    this.type = this.constructor.name;
  }

  public handle(
    _err: unknown,
    request: IRequest<any>,
    response: IResponse
  ): IResponse {
    const { log } = this;
    if (log.stack) {
      delete log.stack;
    }

    const requestMessage = {
      method: request.method,
      url: request.url,
      headers: request.headers,
      body: request.body,
      query: request.query,
      params: request.params,
    };

    console.error(JSON.stringify(requestMessage));

    return response.status(this.httpCode).send(this.body);
  }

  public addTraceIdToLog(err: unknown, traceId: string | undefined) {
    const representation = Object.getOwnPropertyDescriptors(err);
    const log = {
      ...Object.keys(representation).reduce(
        (acc, key) => ({ ...acc, [key]: representation[key].value }),
        {}
      ),
      traceId,
    };

    return log;
  }

  public get body(): IErrorBody {
    return {
      code: this.code,
      message: this.message,
    };
  }

  public get log(): IErrorLogInfo {
    return this;
  }
}
