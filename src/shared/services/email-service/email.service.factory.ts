import { IEmailService } from "./email.service.interface";
import { NodeMailerService } from "../node-mailer-service";

export class EmailServiceFactory {
  public static createEmailService(): IEmailService {
    switch (process.settings.providers.email) {
      case "nodemailer":
        return new NodeMailerService();
      default:
        throw new Error("Unsupported email service");
    }
  }
}
