const express = require("express");
const router = express.Router();

const artService = require("../services/artService");

router.get("/", (req, res) => {
  artService.getAllArts(arts => {
    return res.status(200).json(arts);
  });
});

router.get("/:artId", (req, res) => {
  const artId = req.params.artId;
  artService.getArtById(
    artId,
    art => {
      return res.status(200).json(art);
    },
    err => {
      return res.status(404).json(err);
    }
  );
});

router.post("/", (req, res) => {
  artService.createArt(
    req.body,
    art => {
      return res.status(201).json(art);
    },
    err => {
      return res.status(400).json(err);
    }
  );
});

module.exports = router;
