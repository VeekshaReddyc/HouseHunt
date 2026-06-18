import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import AddProperty from "./pages/AddProperty";
import Bookings from "./pages/Bookings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/home"
          element={<Home />}
        />

        <Route
          path="/add-property"
          element={<AddProperty />}
        />

        <Route
          path="/bookings"
          element={<Bookings />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;