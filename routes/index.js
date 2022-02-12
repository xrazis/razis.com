const express = require('express');
const router = express.Router();
const fs = require('fs');

const {email_user} = require('../config/keys');
const transporter = require('../connections/mailer_conn');
const {emailSchema} = require('../schemas/joi');

router.get('/', (req, res) => {
    try {
        const data = fs.readFileSync('./data/reviews.json', 'utf8');
        const testimonials = JSON.parse(data);

        res.render('index', {'testimonials': testimonials});
    } catch (err) {
        res.render('index', {'testimonials': false});
    }
});

router.post('/contact-us', async (req, res) => {
        try {
            const {firstName, lastName, email, phoneNumber, message} = req.body;
            await emailSchema.validateAsync({firstName, lastName, email, phoneNumber, message});

            const mail = {
                from: email,
                to: email_user,
                subject: `New email from ${lastName} ${firstName} ${phoneNumber}`,
                text: message
            };

            transporter.sendMail(mail, err => {
                if (err) {
                    res.redirect(500, '/500');
                } else {
                    res.render('contact-us', {messageSent: 200});
                }
            });
        } catch (err) {
            res.render('contact-us', {messageSent: 400});
        }
    }
);

router.get('/contact-us', (req, res) => {
    res.render('contact-us', {messageSent: false});
});

router.get('/terms-&-conditions', (req, res) => {
    res.render('terms-&-conditions');
});

router.get('/espa', (req, res) => {
    res.render('espa');
});

router.get('/404', (req, res) => {
    res.render('404');
});

router.get('/500', (req, res) => {
    res.render('500');
});

module.exports = router;
