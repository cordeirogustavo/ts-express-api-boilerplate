import { IQueryParamsDTO } from "./query-params.dto";

export interface IManyOrBlankRequestDTO {
  key?: symbol;
  sql: string;
  params?: IQueryParamsDTO;
}
