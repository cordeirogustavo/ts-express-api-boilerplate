import { IQueryParamsDTO } from "./query-params.dto";

export interface IOneRequestDTO {
  key?: symbol;
  params?: IQueryParamsDTO;
  sql?: string;
}
