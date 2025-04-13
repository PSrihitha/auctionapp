import { useEffect, useState } from "react";
import ParticlesBackground from "../components/ParticlesBackground";
import "./Home.css";
import { Link } from "react-router-dom";

export default function Home() {
  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = () => {
    setOffsetY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="home-container">
      <div
        className="aurora"
        style={{ transform: `translateY(${offsetY * 0.2}px)` }}
      />
      <ParticlesBackground />
      <div
        className="hero-glass animated"
        style={{ transform: `translateY(${offsetY * 0.1}px)` }}
      >
        <h1 className="main-heading animated fadeIn">WELCOME TO</h1>
        <h2 className="sub-heading animated glowText">ICONIC BID</h2>
        <p className="tagline animated fadeIn">
          Exclusive Bids for Iconic Collectors.<br />
          Where the Finest Finds a New Home.
        </p>
        <div className="home-buttons mt-4">
          <Link to="/register" className="btn btn-glow primary-btn me-3">
            <span>Get Started</span>
          </Link>
          <Link to="/login" className="btn btn-glow secondary-btn">
            <span>Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
