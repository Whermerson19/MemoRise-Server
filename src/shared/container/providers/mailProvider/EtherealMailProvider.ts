import IMailProvider from "./IMailProvider";

import handlebars from "handlebars";
import nodemailer, { Transporter } from "nodemailer";

import fs from "fs";


export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    nodemailer
      .createTestAccount()
      .then((account) => {
        const transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        });

        this.client = transporter;
      })
      .catch((err) => console.log(err));
  }

  public async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string
  ): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString("utf-8");

    const parseTemplate = handlebars.compile(templateFileContent);

    const HTMLTemplate = parseTemplate(variables);

    const message = await this.client.sendMail({
      to,
      from: "Equipe Memorise",
      subject,
      html: HTMLTemplate,
    });

    console.log({
      message_id: message.messageId,
      link: nodemailer.getTestMessageUrl(message),
    });
  }
}
