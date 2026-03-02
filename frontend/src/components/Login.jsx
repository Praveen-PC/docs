import React, { useEffect, useState } from "react";
import { useAuth } from "../Authentication/AuthContext";
import api from "../axios/api";
import { useNavigate, Link } from "react-router-dom";
import '../App.css'
const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/user/login", data);

      console.log("response", response.data);

      login(response.data);

      navigate("/dashboard", { replace: true });

    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

//  renderinggg .........

 


  return (
  <div className="login-wrapper d-flex align-items-center justify-content-center">
    <div className="login-card">

      <div className="text-center mb-4">
        <h3 className="login-title">Welcome </h3>
        <p className="login-subtitle">Sign in to continue Docs</p>
      </div>

      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            name="email"
            value={data.email}
            className="form-control custom-input"
            placeholder="you@example.com"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            value={data.password}
            placeholder="Enter your password"
            className="form-control custom-input"
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn login-btn w-100 text-white">
          Sign In
        </button>

        <div className="text-center mt-3">
          <span className="text-muted">New here? </span>
          <Link to="/register" className="register-link">
            Create Account
          </Link>
        </div>
      </form>
    </div>
  </div>
);
};

export default Login;