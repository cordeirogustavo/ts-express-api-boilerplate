import { IQueryParamsDTO } from './query-params.dto'

export interface IManyOrErrorRequestDTO {
  key: symbol
  params: IQueryParamsDTO
}
