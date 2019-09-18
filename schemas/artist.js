const Schema = require("mongoose").Schema;

const ArtistSchema = Schema({
  name: {
    type: String,
    required: true
  },
  nickname: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  memberSince: {
    type: Date,
    default: Date.now
  }
});
module.exports = new Schema(ArtistSchema);
