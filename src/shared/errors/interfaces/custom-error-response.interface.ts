export interface IErrorBody {
  code: number
  message: string
}
export interface IErrorLogInfo extends IErrorBody {
  type: string
  message: string
  stack?: string
  traceId?: string
  httpCode?: number
}
