import { Link } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem("token");

  // ✅ safely parse user
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logged out");

    window.location.reload();
  };

  return (
    <div>

      {/* 🔶 TOP BAR */}
      <div style={{
        background: "#f97316",
        color: "white",
        padding: "5px 40px",
        fontSize: "14px",
        display: "flex",
        justifyContent: "space-between"
      }}>
        <span>✉ info@ngo.org</span>
        <span>📞 +91 9876543210</span>
      </div>

      {/* 🧡 MAIN NAV */}
      <div style={{
        width: "100vw",
        marginLeft: "calc(-50vw + 50%)",
        background: "white",
        padding: "15px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
      }}>

        {/* LOGO */}
        <h2 style={{ color: "#f97316" }}>NGO</h2>

        {/* MENU */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link to="/" style={{ margin: "10px" }}>Home</Link>
          <Link to="/create" style={{ margin: "10px" }}>Create</Link>

          {!token ? (
            <>
              <Link to="/login" style={{ margin: "10px" }}>Login</Link>
              <Link to="/register" style={{ margin: "10px" }}>Register</Link>
            </>
          ) : (
            <>
              {/* ✅ DASHBOARD */}
              <Link to="/dashboard" style={{ margin: "10px" }}>
                Dashboard
              </Link>

              {/* 👤 USER */}
              <span style={{
                marginRight: "10px",
                fontWeight: "bold",
                color: "#0f172a"
              }}>
                👋 {user?.name}
              </span>

              {/* 🔓 LOGOUT */}
              <button
                onClick={handleLogout}
                style={{
                  padding: "6px 12px",
                  background: "#f97316",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer"
                }}
              >
                Logout
              </button>
            </>
          )}
        </div>

      </div>

    </div>
  );
}