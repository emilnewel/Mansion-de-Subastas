const Schema = require("mongoose").Schema;

const ArtSchema = Schema({
  title: {
    type: String,
    required: true
  },
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
  date_created: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String,
    required: false
  }
});

module.exports = new Schema(ArtSchema);
