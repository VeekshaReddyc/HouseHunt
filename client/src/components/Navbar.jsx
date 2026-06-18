import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4">
      <Link className="navbar-brand fw-bold text-primary" to="/dashboard">
        🏠 HouseHunt
      </Link>

      <div className="ms-auto d-flex gap-2">
        <Link className="btn btn-outline-primary" to="/home">
          Home
        </Link>

        <Link className="btn btn-outline-success" to="/add-property">
          Add Property
        </Link>

        {user?.role === "admin" && (
          <Link className="btn btn-outline-info" to="/bookings">
            Bookings
          </Link>
        )}

        <button
          className="btn btn-danger"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;