import { IQueryParamsDTO } from "./query-params.dto";

export interface ICommandRequestDTO {
  key?: symbol;
  params?: IQueryParamsDTO;
  sql?: string;
}
