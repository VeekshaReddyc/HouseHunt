import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const API = "http://localhost:5000/api";

function Home() {
  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const res = await axios.get(`${API}/property`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProperties(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const bookProperty = async (id) => {
    try {
      await axios.post(
        `${API}/booking/book/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Booking successful!");
      fetchProperties();
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed");
    }
  };

  const approveProperty = async (id) => {
    try {
      await axios.put(
        `${API}/property/approve/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Property approved");
      fetchProperties();
    } catch (err) {
      alert("Approval failed");
    }
  };

  const rejectProperty = async (id) => {
    try {
      await axios.delete(`${API}/property/reject/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Property rejected");
      fetchProperties();
    } catch (err) {
      alert("Rejection failed");
    }
  };

  const filtered = properties.filter((p) =>
    `${p.title} ${p.location} ${p.type} ${p.price}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <h2 className="text-primary mb-4">
          Available Properties
        </h2>

        <input
          className="form-control mb-4"
          placeholder="Search by location, type, price..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="row">
          {filtered.length === 0 && (
            <p>No properties found.</p>
          )}

          {filtered.map((p) => (
            <div className="col-md-4 mb-4" key={p._id}>
              <div className="card shadow h-100">
                <div className="card-body">
                  <h5>{p.title}</h5>

                  <p>📍 {p.location}</p>

                  <p>💰 {p.price}</p>

                  <p>🏠 {p.type}</p>

                  <button
                    className="btn btn-primary me-2"
                    onClick={() => bookProperty(p._id)}
                  >
                    Book Now
                  </button>

                  {user?.role === "admin" && (
                    <>
                      <button
                        className="btn btn-success me-2"
                        onClick={() => approveProperty(p._id)}
                      >
                        Approve
                      </button>

                      <button
                        className="btn btn-danger"
                        onClick={() => rejectProperty(p._id)}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;