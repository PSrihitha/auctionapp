import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateAuction from "./pages/CreateAuction";
import PlaceBid from "./pages/Placebid";
import Navbar from "./components/Navbar";
export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-auction" element={<CreateAuction />} />
        <Route path="/place-bid" element={<PlaceBid />} />
      </Routes>
    </Router>
  );
}
