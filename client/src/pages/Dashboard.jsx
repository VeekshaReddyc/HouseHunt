import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <Navbar />

      <div className="container mt-5">
        <div className="card shadow p-4">

          <h2 className="text-primary">
            Welcome, {user?.name} 👋
          </h2>

          <p>
            Role: <strong>{user?.role}</strong>
          </p>

          <div className="mt-4 d-flex gap-3 flex-wrap">

            <button
              className="btn btn-primary"
              onClick={() => navigate("/home")}
            >
              Browse Properties
            </button>

            <button
              className="btn btn-success"
              onClick={() => navigate("/add-property")}
            >
              Add Property
            </button>

            {user?.role === "admin" && (
              <button
                className="btn btn-info"
                onClick={() => navigate("/bookings")}
              >
                View Bookings
              </button>
            )}

            <button
              className="btn btn-danger"
              onClick={logout}
            >
              Logout
            </button>

          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;