import nodemailer, { Transporter } from 'nodemailer';

class SendMailService {

    private client: Transporter;

    // executado assim que uma classe é instanciada.
    constructor() {
        nodemailer.createTestAccount().then(account => {
            console.log(account);
            const transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass
                },
            });

            this.client = transporter;
        });
    }




    async execute(to: string, subject: string, body: string) {

        // const message = await this.client.sendMail({
        //     to,
        //     subject,
        //     html: body,
        //     from: 'NPS <noreplay@nps.com.br>'
        // });

        this.client.sendMail({
            to,
            subject,
            html: body,
            from: 'NPS <noreplay@nps.com.br>'
        }).then(message => {
            console.log('Message sent: %s', message.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));

        }).catch(e => {
            console.log("erro ao enviar email.");
            console.log(e);
        })
    }

}

export default new SendMailService();