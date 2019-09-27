const auctionService = () => {
  const auctionDb = require("../data/db").Auction;
  const auctionBidDb = require("../data/db").AuctionBid;
  const customerDb = require("../data/db").Customer;

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
    auctionDb.findById(id, (err, auction) => {
      if (err) {
        errorCb(err);
      } else {
        cb(auction);
      }
    });
  };

  const getAuctionWinner = (auctionId, cb, errorCb) => {
    let winnerId;
    auctionDb.findById(auctionId, "auctionWinner", (err, winner) => {
      if (err) {
        errorCb(err);
      } else {
        winnerId = winner.auctionWinner;
        customerDb.findById(winnerId, (err, winner) => {
          if (err) {
            errorCb(err);
          } else {
            cb(winner);
          }
        });
      }
    });
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
    auctionBidDb.find({ auctionId: auctionId }, (err, bids) => {
      if (err) {
        errorCb(err);
      } else {
        cb(bids);
      }
    });
  };

  const placeNewBid = (auctionId, customerId, price, cb, errorCb) => {
    auctionDb.findById(auctionId, (err, auction) => {
      if (err) {
        errorCb(err);
      } else {
        if (auction.endDate < new Date()) {
          errorCb("412 Precondition Failed");
        } else if (auction.minimumPrice > price) {
          errorCb("403 Forbidden");
        } else {
          auctionBidDb.find({ auctionId: auctionId }, (err, bidList) => {
            if (err) {
              errorCb(err);
            } else {
              if (
                bidList.length > 0 &&
                bidList[bidList.length - 1].price > price
              ) {
                errorCb("412 Precondition Failed - ");
              } else {
                auctionBidDb.create(
                  {
                    auctionId: auctionId,
                    customerId: customerId,
                    price: price
                  },
                  (err, result) => {
                    if (err) {
                      errorCb(err);
                    } else {
                      auctionDb.findByIdAndUpdate(auctionId, {
                        auctionWinner: customerId
                      }).exec();
                      cb(result);

                    }
                  }
                );
              }
            }
          });
        }
      }
    });
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
