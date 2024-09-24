import { Data } from "ejs";

export interface ITemplateService {
  render<T extends Data>(template: string, data: T): string;
}
