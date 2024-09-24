export interface IEmailService {
  sendEmail(to: string, subject: string, body: any): Promise<void>;
}
