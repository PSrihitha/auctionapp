import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './PlaceBid.css'; 

export default function PlaceBid() {
  const [auctions, setAuctions] = useState([]);
  const [filterPrice, setFilterPrice] = useState(0);
  const [filteredAuctions, setFilteredAuctions] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  const fetchAuctions = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auctions");
      setAuctions(res.data);
      setFilteredAuctions(res.data);
    } catch (err) {
      console.error("Error fetching auctions:", err);
    }
  };

  useEffect(() => {
    fetchAuctions();
  }, []);

  const handleBid = async (id) => {
    if (!token) {
      alert("Please log in to place a bid.");
      return navigate("/login");
    }

    const amount = prompt("Enter your bid amount:");
    if (!amount || isNaN(amount)) return;
    try {
      await axios.post(
        `http://localhost:5000/api/auctions/${id}/bid`,
        { amount },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      fetchAuctions();
    } catch {
      alert("Bid failed. Amount must be higher than the current bid.");
    }
  };

  const handlePriceFilter = (e) => {
    const value = parseInt(e.target.value);
    setFilterPrice(value);
    setFilteredAuctions(
      auctions.filter((auction) => auction.currentBid >= value)
    );
  };

  const getTimeLeft = (endDate) => {
    const timeDiff = new Date(endDate) - new Date();
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="placebid-container">
      <h2 className="text-center fw-bold mb-5">🔥 Live Auctions 🔥</h2>

      {/* Price filter */}
      <div className="price-filter text-center mb-4">
        <label htmlFor="priceFilter">Filter by Price (Min Bid):</label>
        <input
          id="priceFilter"
          type="number"
          value={filterPrice}
          onChange={handlePriceFilter}
          className="price-filter-input"
        />
      </div>

      <div className="auction-cards-container">
        {filteredAuctions.map((a) => (
          <div className="auction-card" key={a._id}>
            <div className="card-content">
              <img
                src={a.image}
                alt={a.title}
                className="card-img"
              />
              <div className="card-body">
                <h5>{a.title}</h5>
                <p>{a.description}</p>
                <p><strong>Current Bid:</strong> ${a.currentBid}</p>
                <p><strong>Time Left:</strong> {getTimeLeft(a.endDate)}</p>
                <button
                  className="btn place-bid-btn"
                  onClick={() => handleBid(a._id)}
                >
                  🚀 Place Bid
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
