const express = require("express");
const router = express.Router();

const auctionService = require("../services/auctionService");

router.get("/", (req, res) => {
  auctionService.getAllAuctions(auctions => {
    return res.status(200).json(auctions);
  });
});

router.get("/:auctionId", (req, res) => {
  const auctionId = req.params.auctionId;
  auctionService.getAuctionById(
    auctionId,
    auction => {
      return res.status(200).json(auction);
    },
    err => {
      return res.status(404).json(err);
    }
  );
});

router.get("/:auctionId/winner", (req, res) => {
  const auctionId = req.params.auctionId;
  auctionService.getAuctionWinner(
    auctionId,
    winner => {
      if(winner == null) {
        return res.status(409).json('Auction has not finished');
      }
      return res.status(200).json(winner);
    },
    err => {
      const statusCode = err.split(' ')[0];
      if(statusCode == "409") {
        return res.status(409).json(err);
      } else {
        return res.status(404).json(err);
      }
    }
  );
});

router.get("/:auctionId/bids", (req, res) => {
  const auctionId = req.params.auctionId;
  auctionService.getAuctionBidsWithinAuction(
    auctionId,
    bids => {
      return res.status(200).json(bids);
    },
    err => {
      return res.status(404).json(err);
    },
  );
});

router.post("/", (req, res) => {
  auctionService.createAuction(
    req.body,
    auction => {
      return res.status(201).json(auction);
    },
    err => {
      return res.status(400).json(err);
    }
  );
});

router.post("/:auctionId/bids", (req, res) => {
  const {auctionId, customerId, price} = req.body;
  auctionService.placeNewBid(
    auctionId, customerId, price, 
    bid => {
      return res.status(201).json(bid);
    }, 
    err => {
      const statusCode = err.split(' ')[0];
      return res.status(parseInt(statusCode)).json(err);
    }
  );
})

module.exports = router;