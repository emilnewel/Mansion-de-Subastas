const express = require("express");
const router = express.Router();

const artistService = require("../services/artistService");

router.get("/", (req, res) => {
  artistService.getAllArtists(artists => {
    return res.status(200).json(artists);
  });
});

router.get("/:artistId", (req, res) => {
  const artistId = req.params.artistId;
  artistService.getArtistById(
    artistId,
    artist => {
      return res.status(200).json(artist);
    },
    err => {
      return res.status(404).json(err);
    }
  );
});

router.post("/", (req, res) => {
  artistService.createArtist(
    req.body,
    artist => {
      return res.status(201).json(artist);
    },
    err => {
      return res.status(400).json(err);
    }
  );
});

module.exports = router;
