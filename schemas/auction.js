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
  //TODO: NEEDS VALIDATION - Real customerID
  //Needs to be changed to Schema.Types.ObjectId
  auctionWinner: {
      type: String
  }
});
module.exports = new Schema(AuctionSchema);
