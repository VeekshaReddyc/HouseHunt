import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:5000/api";

function Login() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = async () => {
    if (!email || !password) {
      alert("Email and Password are required");
      return;
    }

    if (!isLogin && !name) {
      alert("Please enter your name");
      return;
    }

    try {
      if (isLogin) {
        const res = await axios.post(`${API}/user/login`, {
          email,
          password,
        });

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        alert("Login Successful!");
        navigate("/dashboard");
      } else {
        await axios.post(`${API}/user/signup`, {
          name,
          email,
          password,
        });

        alert("Signup Successful! Please login.");

        setIsLogin(true);
        setName("");
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      alert(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Something went wrong"
      );
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div
        className="card shadow p-4"
        style={{
          width: "400px",
          borderRadius: "20px",
        }}
      >
        <h2 className="text-center text-primary mb-4">
          🏠 HouseHunt
        </h2>

        <h4 className="text-center mb-4">
          {isLogin ? "Login" : "Create Account"}
        </h4>

        {!isLogin && (
          <input
            className="form-control mb-3"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

        <input
          className="form-control mb-3"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="form-control mb-3"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="btn btn-primary w-100"
          onClick={auth}
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>

        <p
          className="text-center mt-3"
          style={{ cursor: "pointer" }}
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
}

export default Login;