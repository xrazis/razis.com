const express = require('express');
const router = express.Router();

const transporter = require('../connections/mailer_conn');

router.get('/', (req, res) => {
    res.render('index', {title: 'Express'});
});

module.exports = router;
