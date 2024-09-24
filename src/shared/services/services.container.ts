import { DependencyContainer } from "tsyringe";
import { IContainer } from "@/shared/interfaces";
import { ITokenService, TokenService } from "./token-service";
import { EmailService, IEmailService, ServicesSymbols } from "./";
import { TemplateService } from "./template-service";

export class ServicesContainer implements Partial<IContainer> {
  static register(container: DependencyContainer): void {
    container.register<ITokenService>(ServicesSymbols.TokenService, {
      useValue: new TokenService(process.settings.app.secret),
    });

    container.register<IEmailService>(
      ServicesSymbols.EmailService,
      EmailService
    );

    container.register(ServicesSymbols.TemplateService, TemplateService);
  }
}
