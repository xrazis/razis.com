const express = require('express');
const router = express.Router();

const {determineRoute} = require('../actions/images');

router.get('/rooms', (req, res) => {
    res.render('rooms');
});

router.get('/rooms/storehouse', (req, res) => {
    determineRoute('storehouse', res);
});

router.get('/rooms/writers-room', (req, res) => {
    determineRoute('writers-room', res);
});

router.get('/rooms/apartments', (req, res) => {
    determineRoute('apartments', res);
});

router.get('/rooms/studios', (req, res) => {
    determineRoute('studios', res);
});

module.exports = router;
