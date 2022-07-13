const express = require('express');
const router = express.Router();

const {determineRooms} = require('../actions/images');

router.get('/rooms', (req, res) => {
    res.render('rooms');
});

router.get('/rooms/storehouse', (req, res) => {
    determineRooms('storehouse', ['storehouse'], res);
});

router.get('/rooms/loft', (req, res) => {
    determineRooms('loft', ['loft'], res);
});

router.get('/rooms/apartments', (req, res) => {
    determineRooms('apartments', ['apartments', 'one-bedroom', 'two-bedroom', 'maisonette'], res);
});

router.get('/rooms/studios', (req, res) => {
    determineRooms('studios', ['pool-studios', 'budget-studios'], res);
});

module.exports = router;
