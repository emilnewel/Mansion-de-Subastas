const mongoose = require("mongoose");
const artSchema = require("../schemas/art");
const artistSchema = require("../schemas/artist");
const auctionSchema = require("../schemas/auction");
const auctionBidSchema = require("../schemas/auctionBid");
const customerSchema = require("../schemas/customer");

require("dotenv").config();

const DB_CONN_STR = process.env.DB_CONN_STR

const connection = mongoose.createConnection(
  DB_CONN_STR,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }
);

module.exports = {
  Art: connection.model("Art", artSchema),
  Artist: connection.model("Artist", artistSchema),
  Auction: connection.model("Auction", auctionSchema),
  AuctionBid: connection.model("AuctionBid", auctionBidSchema, "auctionBids"),
  Customer: connection.model("Customer", customerSchema)
};
