import React, { useEffect, useState } from "react";
import "../addUser/Add.css";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Edit = () => {
  const users = {
    fname: "",
    lname: "",
    email: "",
    attendedClass: "",
    totalClass: "",
  };

  const { id } = useParams();
  const [user, setUser] = useState(users);
  const navigate = useNavigate();

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    console.log(user);
  };
  useEffect(() => {
    axios
      .get(`https://attendance-znk2.onrender.com/api/getOne/${id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();
    await axios
      .put(`https://attendance-znk2.onrender.com/api/update/${id}`, user)
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
      <h3>Update User</h3>
      <form className="addUserForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="fname">First Name</label>
          <input
            type="text"
            value={user.fname}
            onChange={inputChangeHandler}
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
            value={user.lname}
            onChange={inputChangeHandler}
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
            value={user.email}
            onChange={inputChangeHandler}
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
            onChange={inputChangeHandler}
            id="attendedClass"
            name="attendedClass"
            autoComplete="off"
            placeholder="attendedClass"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="totalClass">Password</label>
          <input
            type="text"
            onChange={inputChangeHandler}
            id="totalClass"
            name="totalClass"
            autoComplete="off"
            placeholder="totalClass"
          />
        </div>
        <div className="inputGroup">
          <button type="submit">Update User</button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
