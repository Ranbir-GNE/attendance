import React, { useState } from "react";
import "./Add.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export const Add = () => {
  const [fName, setFName] = useState("")
  const [lName, setLName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();
    const user = {
      fname: fName,
      lname: lName,
      email,
      courses: [
        {
          courseNumber: 1,
          attendedClass: 0,
          totalClass: 0
        }, {
          courseNumber: 2,
          attendedClass: 0,
          totalClass: 0
        }, {
          courseNumber: 3,
          attendedClass: 0,
          totalClass: 0
        }, {
          courseNumber: 4,
          attendedClass: 0,
          totalClass: 0
        }, {
          courseNumber: 5,
          attendedClass: 0,
          totalClass: 0
        },
      ],
      password: password
    }

    console.log(user)
    await axios
      .post("http://localhost:8000/api/create", user)
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
            value={fName}
            onChange={e => setFName(e.target.value)}
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
            value={lName}
            onChange={e => setLName(e.target.value)}
            id="lname"
            name="lname"
            autoComplete="off"
            placeholder="Last Name"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input
            value={email}
            type="email"
            onChange={e => setEmail(e.target.value)}
            id="email"
            name="email"
            autoComplete="off"
            placeholder="Email"
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
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
            onChange={e => setEmail(e.target.value)}
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
