import ejs, { Data } from "ejs";
import { ITemplateService } from "./";
import { singleton } from "tsyringe";

@singleton()
export class TemplateService implements ITemplateService {
  render<T extends Data>(template: string, data: T): string {
    try {
      return ejs.render(template, data);
    } catch (err) {
      console.error({ err });
      return `FAILED TO RENDER template ${(err as any).message}`;
    }
  }
}
