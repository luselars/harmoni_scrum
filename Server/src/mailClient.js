// @flow
let nodemailer = require('nodemailer');

let sender = "harmoni.noreply@gmail.com";
let sender_password = "pannekaker med brunost";
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: sender,
        pass: sender_password
    }
});

function sendInvite(receiver: string, eventName: string) {
    let mailOptions = {
        from: sender,
        to: receiver,
        subject: 'Du er blitt lagt til som artist i et arrangement!',
        html: '<p>hei</p>'
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}