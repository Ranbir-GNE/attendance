import React, { useEffect, useState } from "react";
import "../addUser/Add.css";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Course = () => {
  const initialUserState = {
    course: "",
    attendedClasses: "",
    totalClasses: "",
  };

  const { id } = useParams();
  const [user, setUser] = useState(initialUserState);
  const navigate = useNavigate();

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  useEffect(() => {
    axios
      .get(`https://attendance-znk2.onrender.com/api/getOne/${id}`)
      .then((response) => {
        const data = response.data;
        setUser({
          course: data.course || "",
          attendedClasses: data.attendedClasses || "",
          totalClasses: data.totalClasses || "",
        });
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
          <label htmlFor="selectCourse">Select Course</label>
          <select
            value={user.course}
            onChange={inputChangeHandler}
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
          <label htmlFor="attendedClasses">Attended Classes</label>
          <input
            type="number"
            value={user.attendedClasses}
            onChange={inputChangeHandler}
            id="attendedClasses"
            name="attendedClasses"
            autoComplete="off"
            placeholder="Attended Classes"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="totalClasses">Total Classes</label>
          <input
            type="number"
            value={user.totalClasses}
            onChange={inputChangeHandler}
            id="totalClasses"
            name="totalClasses"
            autoComplete="off"
            placeholder="Total Classes"
          />
        </div>
        <div className="inputGroup">
          <button type="submit">Update User</button>
        </div>
      </form>
    </div>
  );
};

export default Course;
