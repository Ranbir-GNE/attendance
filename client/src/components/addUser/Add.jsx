import React, { useState } from "react";
import "./Add.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export const Add = () => {
  const users = {
    fname: "",
    lname: "",
    email: "",
    attendedClass: "",
    totalClass: "",
    password: "",
    course:"",
  };
  const [user, setUser] = useState(users);
  const navigate = useNavigate();
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const submitForm = async (e) => {
    e.preventDefault();
    await axios
      .post("https://attendance-znk2.onrender.com/api/create", user)
      .then((response) => {
        toast.success(response.data.msg, { duration: 2000 });
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="addUser">
      <Link to={"/"} className="backButton">
        Back
      </Link>
      <h3>Add New User</h3>
      <form className="addUserForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="fname">First Name</label>
          <input
            type="text"
            onChange={inputHandler}
            id="fname"
            name="fname"
            autoComplete="off"
            placeholder="First Name"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="lname">Last Name</label>
          <input
            type="text"
            onChange={inputHandler}
            id="lname"
            name="lname"
            autoComplete="off"
            placeholder="Last Name"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            onChange={inputHandler}
            id="email"
            name="email"
            autoComplete="off"
            placeholder="Email"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="attendedClass">Attended Classes</label>
          <input
            type="text"
            onChange={inputHandler}
            id="attendedClass"
            name="attendedClass"
            autoComplete="off"
            placeholder="attendedClass"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="totalClass">Total Classes</label>
          <input
            type="text"
            onChange={inputHandler}
            id="totalClass"
            name="totalClass"
            autoComplete="off"
            placeholder="totalClass"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="selectCourse">Select Course</label>
          <select
            value={user.course}
            onChange={inputHandler}
            id="selectCourse"
            name="course"
          >
            <option value="">Select Course</option>
            <option value="1">Course 1</option>
            <option value="2">Course 2</option>
            <option value="3">Course 3</option>
            <option value="4">Course 4</option>
            <option value="5">Course 5</option>
          </select>
        </div>
       
        <div className="inputGroup">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            onChange={inputHandler}
            id="password"
            name="password"
            autoComplete="off"
            placeholder="Password"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="key">Key</label>
          <input
            type="password"
            onChange={inputHandler}
            id="key"
            name="key"
            autoComplete="off"
            placeholder="key"
            required={false}
          />
        </div>
        <div className="inputGroup">
          <button type="submit">Add User</button>
        </div>
      </form>
    </div>
  );
};
export default Add;
