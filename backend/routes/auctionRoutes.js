import express from "express";
import jwt from "jsonwebtoken";
import Auction from "../models/Auction.js";

const router = express.Router();

function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.sendStatus(401);
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.sendStatus(403);
  }
}

router.get("/", async (_, res) => {
  const auctions = await Auction.find();
  res.json(auctions);
});

router.post("/", verifyToken, async (req, res) => {
  const { title, description, startingBid, image } = req.body;
  const newAuction = new Auction({
    title,
    description,
    startingBid,
    currentBid: startingBid,
    image,
    owner: req.user.id
  });
  await newAuction.save();
  res.json(newAuction);
});

router.post("/:id/bid", verifyToken, async (req, res) => {
  const { amount } = req.body;
  const auction = await Auction.findById(req.params.id);
  if (amount <= auction.currentBid) return res.status(400).json({ message: "Bid too low" });
  auction.currentBid = amount;
  auction.bids.push({ username: req.user.id, amount, time: new Date() });
  await auction.save();
  res.json(auction);
});

export default router;
