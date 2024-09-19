import { IQueryParamsDTO } from './query-params.dto'

export interface IOneOrNoneRequestDTO {
  key: symbol
  params: IQueryParamsDTO
}
