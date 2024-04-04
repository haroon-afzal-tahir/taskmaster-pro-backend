import nodemailer from 'nodemailer';
import type { SendMailOptions } from 'nodemailer';
import { logger } from '../config/winston';

export class EmailLib {
  public static async sendEmail(to: string, subject: string, body: string) {
    try {
      const mailTransport = nodemailer.createTransport({
        service: 'gmail',
        host: "smtpout.secureserver.net",
        secure: true,
        tls: { ciphers: "SSLv3" },
        requireTLS: true,
        port: 465,
        debug: false,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        }
      });

      const mailOptions: SendMailOptions = {
        from: process.env.EMAIL,
        to,
        subject,
        html: body,
      };

      await mailTransport.sendMail(mailOptions);

    } catch (error) {
      logger.error((error as Error).message);
      return;
    }
  }
}
