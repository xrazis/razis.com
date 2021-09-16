const express = require('express');
const router = express.Router();

const {email_user} = require('../config/keys');
const transporter = require('../connections/mailer_conn');

router.get('/', (req, res) => {
    res.render('index', {title: 'Express'});
});

router.post('/contact-us', (req, res) => {
    const {email, subject, name, message} = req.body;

    const mail = {
        from: email,
        to: email_user,
        subject: subject + ' from ' + name,
        text: message
    };

    transporter.sendMail(mail, err => {
        if (err) {
            res.redirect('/500', 500);
        } else {
            res.redirect('/contact-us', 200);
        }
    });
});

router.get('/contact-us', (req, res) => {
    if (req.statusCode) {
        res.render('contact-us', {messageSent: true});
    }

    res.render('contact-us', {messageSent: false});
});

module.exports = router;
