import nodemailer, { Transporter } from "nodemailer";
import { IEmailService } from "@/shared/services";

export class NodeMailerService implements IEmailService {
  private transporter: Transporter;
  private senderName: string;
  private senderEmail: string;

  constructor() {
    this.senderEmail =
      process?.settings?.email.sender.email || "no-reply@localhost";
    this.senderName =
      process?.settings?.email.sender.name || "no-reply@localhost";

    this.transporter = nodemailer.createTransport({
      host: process?.settings?.email.host || "localhost",
      port: Number(process?.settings?.email.port || 587),
      secure: Number(process?.settings?.email.port) === 465,
      auth: {
        user: process?.settings?.email.auth.user || "no-reply@localhost",
        pass: process?.settings?.email.auth.pass || "no-reply@localhost",
      },
    });
  }

  public async sendEmail(
    to: string,
    subject: string,
    body: string
  ): Promise<void> {
    try {
      const mailOptions = {
        from: `"${this.senderName}" <${this.senderEmail}>`,
        to,
        subject,
        html: body,
      };
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }
}
