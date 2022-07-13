const express = require('express');
const router = express.Router();
const {SitemapStream, streamToPromise} = require('sitemap')
const {createGzip} = require('zlib');
const fs = require('fs');

const {email_user} = require('../config/keys');
const transporter = require('../connections/mailer_conn');
const {emailSchema} = require('../schemas/joi');
const {getImagesFromDirs} = require('../actions/images');
let sitemap;

router.get('/', (req, res) => {
    try {
        const data = fs.readFileSync('./data/reviews.json', 'utf8');
        const testimonials = JSON.parse(data);

        res.render('index', {'testimonials': testimonials});
    } catch {
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

router.get('/photos', (req, res) => {
    const images = getImagesFromDirs([
        'outdoors',
        'indoors/apartments',
        'indoors/budget-studios',
        'indoors/maisonette',
        'indoors/one-bedroom',
        'indoors/pool-studios',
        'indoors/storehouse',
        'indoors/two-bedroom',
        'indoors/loft',
    ]);

    res.render('photos', {images: images});
});

router.get('/espa', (req, res) => {
    res.render('espa');
});

router.get('/sitemap.xml', (req, res) => {
    res.header('Content-Type', 'application/xml');
    res.header('Content-Encoding', 'gzip');
    if (sitemap) {
        res.send(sitemap)
        return
    }

    try {
        const smStream = new SitemapStream({hostname: 'https://razis.com/'})
        const pipeline = smStream.pipe(createGzip());

        smStream.write({url: '/'});
        smStream.write({url: '/rooms'});
        smStream.write({url: '/photos'});
        smStream.write({url: '/terms-&-conditions'});
        smStream.write({url: '/contact-us'});
        smStream.write({url: '/espa'});
        smStream.write({url: '/rooms/studios'});
        smStream.write({url: '/rooms/apartments'});
        smStream.write({url: '/rooms/loft'});
        smStream.write({url: '/rooms/storehouse'});

        streamToPromise(pipeline).then(sm => sitemap = sm);
        smStream.end();
        pipeline.pipe(res).on('error', e => {
            throw e
        });
    } catch (e) {
        console.error(e);
        res.status(500).end();
    }
});

router.get('/404', (req, res) => {
    res.render('404');
});

router.get('/500', (req, res) => {
    res.render('500');
});

module.exports = router;
