import { useState } from "react";
import axios from "axios";
import "./FormTheme.css"; // Reuse the same CSS for consistent styling

export default function CreateAuction() {
  const [auction, setAuction] = useState({
    title: "",
    description: "",
    startingBid: 0,
    image: ""
  });
  const token = localStorage.getItem("token");

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auctions", auction, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Auction created!");
      setAuction({ title: "", description: "", startingBid: 0, image: "" });
    } catch (err) {
      alert("Error creating auction");
    }
  };

  return (
    <div className="form-page-container">
      <form className="form-card" onSubmit={handleCreate}>
        <h2 className="form-title">Create Auction</h2>
        <input
          type="text"
          placeholder="Title"
          className="form-input"
          value={auction.title}
          onChange={(e) => setAuction({ ...auction, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          className="form-input"
          value={auction.description}
          onChange={(e) => setAuction({ ...auction, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          className="form-input"
          value={auction.image}
          onChange={(e) => setAuction({ ...auction, image: e.target.value })}
        />
        <input
          type="number"
          placeholder="Starting Bid"
          className="form-input"
          value={auction.startingBid}
          onChange={(e) => setAuction({ ...auction, startingBid: e.target.value })}
        />
        <button className="form-button">Create Auction</button>
      </form>
    </div>
  );
}
