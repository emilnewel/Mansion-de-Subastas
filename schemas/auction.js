const Schema = require("mongoose").Schema;

const AuctionSchema = Schema({
  artId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  minimumPrice: {
    type: Number,
    default: 1000
  },
  endDate: {
    type: Date,
    required: true
  },
  auctionWinner: {
      type: Schema.Types.ObjectId
  }
});
module.exports = new Schema(AuctionSchema);
