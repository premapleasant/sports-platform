import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h3>Sports Platform</h3>

      <div>
        <Link to="/matches">Matches</Link>
        <Link to="/favorites">Favorites</Link>
        <button onClick={logout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
