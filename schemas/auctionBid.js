const Schema = require("mongoose").Schema;

const AuctionBidSchema = Schema({
  auctionId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  customerId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});
module.exports = new Schema(AuctionBidSchema);
