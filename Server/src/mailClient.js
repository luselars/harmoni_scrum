// @flow
let nodemailer = require('nodemailer');
let sender = 'harmoni.noreply@protonmail.com';

let transporter = nodemailer.createTransport({
  service: 'Mailgun',
  auth: {
    user: 'postmaster@sandboxb154d30a7f9840c6881fd2237c01c79b.mailgun.org',
    pass: '42a2f1ce9ffa7bee89dbfdca21ba0ebb-713d4f73-df73a17c',
  },
});

/*
For å sende mail til noen må addressene være forhåndsgodkjente, fordi vi ikke betaler for noen service. RIP
 */
export function sendInvite(receiver: string, eventName: string): ?boolean {
  let mailOptions = {
    from: sender,
    to: receiver,
    subject: 'Du er blitt lagt til som artist i et arrangement!',
    html: '<p>hei du er invitert til ' + eventName + '</p>',
  };
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
      return false;
    } else {
      console.log('Email sent: ' + info.response);
      return true;
    }
  });
}
