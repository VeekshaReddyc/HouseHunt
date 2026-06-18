import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const API = "http://localhost:5000/api";

function AddProperty() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");

  const token = localStorage.getItem("token");

  const addProperty = async () => {
    if (!title || !location || !price || !type || !description) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post(
        `${API}/property/add`,
        {
          title,
          location,
          price,
          type,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(
        "Property submitted successfully! Waiting for admin approval."
      );

      navigate("/home");
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Failed to add property"
      );
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-5">
        <div className="card shadow p-4">
          <h2 className="text-primary mb-4">
            Add Property
          </h2>

          <input
            className="form-control mb-3"
            placeholder="Property Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="form-control mb-3"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <input
            className="form-control mb-3"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <input
            className="form-control mb-3"
            placeholder="Type (1BHK/2BHK)"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />

          <textarea
            className="form-control mb-3"
            rows="4"
            placeholder="Description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
          />

          <button
            className="btn btn-success w-100"
            onClick={addProperty}
          >
            Submit Property
          </button>
        </div>
      </div>
    </>
  );
}

export default AddProperty;