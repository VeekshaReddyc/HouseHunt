import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const API = "http://localhost:5000/api";

function Bookings() {
  const [bookings, setBookings] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${API}/booking`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBookings(res.data);
    } catch (err) {
      alert("Failed to fetch bookings");
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-5">
        <div className="card shadow p-4">
          <h2 className="text-primary mb-4">
            📅 Booking Management
          </h2>

          {bookings.length === 0 ? (
            <p>No bookings found.</p>
          ) : (
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>User Name</th>
                  <th>Email</th>
                  <th>Property</th>
                  <th>Location</th>
                  <th>Booked On</th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking._id}>
                    <td>{booking.userId?.name}</td>
                    <td>{booking.userId?.email}</td>
                    <td>{booking.propertyId?.title}</td>
                    <td>{booking.propertyId?.location}</td>
                    <td>
                      {new Date(
                        booking.createdAt
                      ).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}

export default Bookings;