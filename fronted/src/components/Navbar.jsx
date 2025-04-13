import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg custom-navbar px-4">
      <Link className="navbar-brand brand-glow text-silver" to="/">🌟 IconicBid</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link text-silver custom-link" to="/create-auction">Create Auction</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-silver custom-link" to="/place-bid">Place Bid</Link>
          </li>
          {token ? (
            <li className="nav-item">
              <button className="btn btn-outline-light ms-3 custom-btn" onClick={handleLogout}>Logout</button>
            </li>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link text-silver custom-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-silver custom-link" to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
