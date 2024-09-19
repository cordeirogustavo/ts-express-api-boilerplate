import { IRequest, IResponse } from "@/shared/interfaces";
import { IErrorBody, IErrorLogInfo } from "./custom-error-response.interface";

export interface IBaseExceptionHandler {
  get body(): IErrorBody;
  get log(): IErrorLogInfo;

  handle(err: unknown, request: IRequest<any>, response: IResponse): IResponse;
}
