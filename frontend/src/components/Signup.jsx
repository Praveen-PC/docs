import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios/api";
import {  Link } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/user/signup", userData);

      console.log(response.data);

      navigate("/login", { replace: true });

    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  // return (
  //   <div className="d-flex align-items-center justify-content-center vh-100">
  //     <div className="shadow border p-4 rounded" style={{ width: "400px" }}>
  //       <div className="text-center mb-3">
  //         <h3 className="fw-bold">Register</h3>
  //       </div>

  //       <form onSubmit={handleRegister}>
  //         <div className="mb-3">
  //           <label>Name</label>
  //           <input
  //             type="text"
  //             name="name"
  //             placeholder="Enter Your Name"
  //             value={userData.name}
  //             className="form-control"
  //             onChange={handleChange}
  //             required
  //           />
  //         </div>

  //         <div className="mb-3">
  //           <label>Email</label>
  //           <input
  //             type="email"
  //             name="email"
  //             placeholder="Enter Your Email"
  //             value={userData.email}
  //             className="form-control"
  //             onChange={handleChange}
  //             required
  //           />
  //         </div>

  //         <div className="mb-3">
  //           <label>Password</label>
  //           <input
  //             type="password"
  //             name="password"
  //             placeholder="Enter Your Password"
  //             value={userData.password}
  //             className="form-control"
  //             onChange={handleChange}
  //             required
  //           />
  //         </div>

  //         <div className="text-end">
  //           <button type="submit" className="btn btn-primary">
  //             Register
  //           </button>
  //         </div>
  //       </form>
  //     </div>
  //   </div>
  // );


return (
  <div className="login-wrapper d-flex align-items-center justify-content-center">
    <div className="login-card">

      <div className="text-center mb-4">
        <h3 className="login-title">Create Account</h3>
        <p className="login-subtitle">
          Join Docs and start exploring intelligent workflows
        </p>
      </div>

      <form onSubmit={handleRegister}>

        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Donald Trump"
            value={userData.name}
            className="form-control custom-input"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={userData.email}
            className="form-control custom-input"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Create a secure password"
            value={userData.password}
            className="form-control custom-input"
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn login-btn w-100 text-white">
          Create Account
        </button>

        <div className="text-center mt-3">
          <span className="text-muted">Already have an account? </span>
          {/* <a href="/login" className="register-link">
            Sign In
          </a> */}

           <Link to="/login" className="register-link">
            Create Account
          </Link>
        </div>

      </form>
    </div>
  </div>
);
};

export default Signup;