"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main(downloaded) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'cmsreports@outlook.com', // generated ethereal user
            pass: 'Aut0m0ti0n', // generated ethereal password
        },
        tls:{
            rejectUnauthorized: false
        }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Email Test" <cmsreports@outlook.com>', // sender address
        to: "alanyou73@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "I'm Your Father!", // plain text body
        html: "<b>I'm Your Father!</b>", // html body
        attachments:[
            {
                filename: 'license.pdf',
                // path: 'https://raw.github.com/nodemailer/nodemailer/master/LICENSE'
                path: `C:/Users/shmue/Downloads/${downloaded}`
            }
        ]
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
// main().catch(console.error);
module.exports = main;
