const auctionService = () => {
  const auctionDb = require("../data/db").Auction;
  const auctionBidDb = require("../data/db").AuctionBid;
  const artDb = require("../data/db").Art;
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
    auctionDb.findById(auctionId, (err, auction) => {
      if(err) {
        errorCb("404 Not Found")
      } else {
        if(auction.endDate < new Date()) {
          let winnerId;
          auctionDb.findById(auctionId, "auctionWinner", (err, winner) => {
            if (err) {
              errorCb("404 Not Found");
            } else {
              winnerId = winner.auctionWinner;
              customerDb.findById(winnerId, (err, winner) => {
                if (err) {
                  errorCb("404 Not Found");
                }  else {
                  cb(winner);
                }
              });
            }
          });
        } else {
          errorCb("409 Conflict")
        }
      }
    })
  };

  const createAuction = (auction, cb, errorCb) => {
    // VALIDATION
    // Is the artId valid??
    let isAuctionItem;
    artDb.findById(auction.artId, "isAuctionItem", (err, art) => {
      if (err) {
        errorCb(err);
      } else {
        // Is the artId an auction item?? ERROR:412
        isAuctionItem = art.isAuctionItem;
        if(isAuctionItem == false){
          errorCb("412 Precondition failed - This art isn't up for auction.");
        } else {
          // Is there ongoing auction for this art ERROR:409
          auctionDb.find({artId: auction.artId}, (err, art) => {
            if (err){
              errorCb(err);
            } else if (art.length != 0){
              errorCb("409 Conflict - There is already a ongoing auction for this art.")
            } else {
              auctionDb.create(auction, (err, result) => {
                if (err) {
                  errorCb(err);
                } else {
                  cb(result);
                }
              });
            }
          });
        }
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
