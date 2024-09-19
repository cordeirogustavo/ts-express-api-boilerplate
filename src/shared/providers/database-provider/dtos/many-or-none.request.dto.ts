import { IQueryParamsDTO } from "./query-params.dto";

export interface IManyOrNoneRequestDTO {
  key?: symbol;
  params?: IQueryParamsDTO;
  sql?: string;
}
