const Schema = require("mongoose").Schema;

const ArtSchema = Schema({
  images: {
    type: [String],
    required: false
  },
  isAuctionItem: {
    type: Boolean,
    default: false
  },
  artistId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String,
    required: false
  }
});

module.exports = new Schema(ArtSchema);
