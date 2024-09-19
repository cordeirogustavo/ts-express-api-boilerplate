import { ZodError } from "zod";
import { INextFunction, IRequest, IResponse } from "@/shared/interfaces";
import { BaseExceptionHandler } from "../errors/handlers/base.error";
import {
  UnhandledError,
  UnauthorizedDataHandler,
  CastErrorHandler,
} from "../errors/handlers";

export function expressErrorHandler(
  err: unknown,
  request: IRequest<any>,
  response: IResponse,
  _next: INextFunction
) {
  if (err instanceof BaseExceptionHandler) {
    return err.handle(err, request, response);
  }

  const authErrorMessage = Object.values({});
  const isAuthError =
    err instanceof Error && authErrorMessage.includes(err.message);
  if (isAuthError) {
    const unauthorizedError = new UnauthorizedDataHandler();
    return unauthorizedError.handle(err, request, response);
  }

  if (err instanceof ZodError) {
    const [firstError] = err.issues;
    const errorMessage = `${firstError.message} on ${firstError.path.join(
      ", "
    )}`;

    const castError = new CastErrorHandler(errorMessage);
    return castError.handle(err, request, response);
  }

  const unhandledError = new UnhandledError();
  return unhandledError.handle(err, request, response);
}
