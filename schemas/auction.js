const Schema = require('mongoose').Schema;

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
    }
    //TODO: VALIDATE OBJECT ID
    // auctionWinner: {
    //     type: Schema.Types.ObjectId,
    //     validate: 
    // }
})
module.exports = new Schema(AuctionSchema);
