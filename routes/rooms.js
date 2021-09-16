const express = require('express');
const router = express.Router();

router.get('/rooms', (req, res) => {
    res.render('rooms');
});

router.get('/rooms/storehouse', (req, res) => {
    res.render('storehouse');
});

router.get('/rooms/writers-room', (req, res) => {
    res.render('writers-room');
});

router.get('/rooms/apartments', (req, res) => {
    res.render('apartments');
});

router.get('/rooms/studios', (req, res) => {
    res.render('studios');
});

module.exports = router;
