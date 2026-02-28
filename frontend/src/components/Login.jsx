import React, { useEffect, useState } from "react";
import { useAuth } from "../Authentication/AuthContext";
import api from "../axios/api";
import { useNavigate, Link } from "react-router-dom";

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

 

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="shadow border p-4 rounded" style={{ width: "400px" }}>
        <h3 className="text-center mb-3">Login</h3>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={data.email}
              className="form-control"
              placeholder="Enter Your Name"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={data.password}
              placeholder="Enter Your Password"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>

          <div className="d-flex justify-content-between align-items-center">

            <p><span>New User ? </span>
             <Link to="/register">Register</Link>
            </p>
           

            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;