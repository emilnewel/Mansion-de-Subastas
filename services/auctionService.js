const auctionService = () => {
  const auctionDb = require("../data/db").Auction;
  const auctionBidDb = require("../data/db").AuctionBid;

  const getAllAuctions = (cb, errorCb) => {
    auctionDb.find({}, (err, auctions) => {
      if (err) {
        throw new Error(err);
      } else {
        cb(auctions);
      }
    });
  };

  const getAuctionById = (id, cb, errorCb) => {
    auctionDb.find(id, (err, auction) => {
      if (err) {
        throw new Error(err);
      } else {
        cb(auction);
      }
    });
  };

  const getAuctionWinner = (auctionId, cb, errorCb) => {
    //TODO: get auction winner from db
  };

  const createAuction = (auction, cb, errorCb) => {
    auctionDb.create(auction, (err, result) => {
      if (err) {
        errorCb(err);
      } else {
        cb(result);
      }
    });
  };

  const getAuctionBidsWithinAuction = (auctionId, cb, errorCb) => {
    //TODO: get bids within auction by id
  };

  const placeNewBid = (auctionId, customerId, price, cb, errorCb) => {
    //TODO: post new bid in auction with auctionid, customerid and price
  };

  return {
    getAllAuctions,
    getAuctionById,
    getAuctionWinner,
    createAuction,
    getAuctionBidsWithinAuction,
    placeNewBid
  };
};

module.exports = auctionService();
