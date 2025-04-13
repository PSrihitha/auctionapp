import mongoose from "mongoose";

const auctionSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  startingBid: Number,
  currentBid: {
    type: Number,
    default: 0
  },
  owner: String,
  bids: [{ username: String, amount: Number, time: Date }]
}, { timestamps: true });

export default mongoose.model("Auction", auctionSchema);
