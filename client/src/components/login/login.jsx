import React, { useState } from "react";
import "../addUser/Add.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [key, setKey] = useState(""); // [1
  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://attendance-znk2.onrender.com/api/login", {
        email,
        password,
      });
      if (response.data.success) {
        toast.success("Logged in successfully");
        // Check if admin key is provided and valid (assuming it's entered by the user)
        if (key) {
          navigate("/admin");
        } else {
          const id= response.data.data._id
          navigate('/user', { state: { id: id } });
        }
      } else {
        toast.error(response.data.message || "Invalid credentials");
      }
    } catch (error) {
      // Handle specific error messages based on error response
      if (error.response) {
        toast.error(error.response.data.message || "An error occurred");
      } else {
        toast.error("An error occurred");
      }
    }
  };

  return (
    <div className="addUser">
      <Link to={"/"} className="addButton">
        logout
      </Link>
      <h3>Login</h3>
      <form className="addUserForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="off"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="off"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="key">Admin Key</label>
          <input
            type="password"
            id="key"
            name="key"
            autoComplete="off"
            placeholder="key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
        </div>
        <div className="inputGroup">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
