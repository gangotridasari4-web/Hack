import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateCampaign from "./pages/CreateCampaign";
import Donate from "./pages/Donate";
import CampaignDetails from "./pages/CampaignDetails";
import Navbar from "./components/Navbar";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>

      {/* ✅ Navbar should be here */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateCampaign />} />
        <Route path="/donate/:id" element={<Donate />} />
        <Route path="/campaign/:id" element={<CampaignDetails />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

<Route path="/dashboard" element={<Dashboard />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;