import { IQueryParamsDTO } from "./query-params.dto";

export interface INoneRequestDTO {
  key?: symbol;
  params?: IQueryParamsDTO;
  sql?: string;
}
