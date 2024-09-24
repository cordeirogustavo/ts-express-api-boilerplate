import { inject, singleton } from "tsyringe";
import { TemplateService, IEmailService, EmailServiceFactory } from "../";
import { ServicesSymbols } from "../services.symbols";
import {
  TUserActivationEmail,
  TUserForgotPasswordEmail,
  UserActivationEmailTemplate,
  UserForgotPasswordEmailTemplate,
} from "@/templates";
import { getTranslate, TLanguages } from "@/shared/utils/translates";

@singleton()
export class EmailService implements IEmailService {
  private emailService: IEmailService;

  constructor(
    @inject(ServicesSymbols.TemplateService)
    private readonly templateService: TemplateService
  ) {
    this.emailService = EmailServiceFactory.createEmailService();
  }

  public async sendEmail(
    to: string,
    subject: string,
    body: string
  ): Promise<void> {
    try {
      await this.emailService.sendEmail(to, subject, body);
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  }

  public async sendAccountConfirmationEmail(
    email: string,
    name: string,
    language: TLanguages,
    token: string
  ): Promise<void> {
    this.sendEmail(
      email,
      getTranslate("emailConfirmation", language),
      this.templateService.render<TUserActivationEmail>(
        UserActivationEmailTemplate,
        {
          hello: getTranslate("hello", language),
          userName: name,
          welcomeActivateEmailMessage: getTranslate(
            "welcomeActivateEmailMessage",
            language
          ),
          ignoreEmailMessage: getTranslate("ignoreEmailMessage", language),
          confirmAccount: getTranslate("confirmAccount", language),
          confirmAccountLink: `${process.settings.app.url}/confirm-account?token=${token}`,
          allRightsReserved: getTranslate("allRightsReserved", language),
        }
      )
    );
  }

  public async sendResetPasswordEmail(
    email: string,
    name: string,
    language: TLanguages,
    token: string
  ): Promise<void> {
    this.sendEmail(
      email,
      getTranslate("forgotPasswordRequestTitle", language),
      this.templateService.render<TUserForgotPasswordEmail>(
        UserForgotPasswordEmailTemplate,
        {
          hello: getTranslate("hello", language),
          userName: name,
          forgotPasswordEmailMessage: getTranslate(
            "forgotPasswordEmailMessage",
            language
          ),
          ignoreEmailMessage: getTranslate("ignoreEmailMessage", language),
          createNewPassword: getTranslate("createNewPassword", language),
          createNewPasswordLink: `${process.settings.app.url}/reset-password?token=${token}`,
          allRightsReserved: getTranslate("allRightsReserved", language),
        }
      )
    );
  }
}
