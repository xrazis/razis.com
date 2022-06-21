const nodemailer = require('nodemailer');

const {email_host, email_password, email_user} = require('../config/keys');

const transport = {
    host: email_host,
    auth: {
        user: email_user,
        pass: email_password
    }
};

const transporter = nodemailer.createTransport(transport);

transporter.verify(error => {
    if (error) {
        console.log(`Nodemailer could not connect due to ${error.code} error!`);
    } else {
        console.log('Nodemailer is running...');
    }
});

module.exports = transporter;
