import { IQueryParamsDTO } from './query-params.dto'

export interface IManyOrBlankRequestDTO {
  key: symbol
  params: IQueryParamsDTO | void
}
