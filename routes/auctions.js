const express = require('express');
const router = express.Router()

const auctionService = require('../services/auctionService');

router.get('/', (req, res) => {
    res.send('hello');
});

router.get('/:artistId', (req, res) => {
    res.json(artistService.getArtistById(artisId));
});

router.post('/', (req, res) => {
    res.json(auctionService.createAuction(req.body));
});


module.exports = router;