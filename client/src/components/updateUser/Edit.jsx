import React, { useEffect, useState } from "react";
import "../addUser/Add.css";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Edit = () => {
  const [fName, setFName] = useState("")
  const [lName, setLName] = useState("")
  const [email, setEmail] = useState("")
  const [course, setCourse] = useState(1)
  const [attendedClasses, setAttendedClasses] = useState(0)
  const [totalClasses, setTotalClass] = useState(0)
  const [courses, setCourses] = useState([])


  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/getOne/${id}`)
      .then((response) => {
        setFName(response.data.fname)
        setLName(response.data.lname)
        setEmail(response.data.email)
        setCourses(response.data.courses)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();
    const newCourse = {
          courseNumber: Number(course),
          attendedClass: Number(attendedClasses),
          totalClass: Number(totalClasses)
        }

    const unChangedCourses = courses.filter(course => course.courseNumber !== newCourse.courseNumber)
    const user = {
      fname: fName,
      lname: lName,
      email,
      courses: [...unChangedCourses, newCourse],
    }

    await axios
      .put(`http://localhost:8000/api/update/${id}`, user)
      .then((response) => {
        toast.success(response.data.msg, { duration: 2000 });
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="addUser">
      <Link to={"/admin"} className="backButton">
        Back
      </Link>
      <h3>Update User</h3>
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
          <label htmlFor="attendedClass">Attended Classes</label>
          <input
            type="number"
            value={attendedClasses}
            onChange={e => setAttendedClasses(e.target.value)}
            id="attendedClass"
            name="attendedClass"
            autoComplete="off"
            placeholder="attendedClass"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="totalClass">Total Classes</label>
          <input
            type="number"
            value={totalClasses}
            onChange={e => setTotalClass(e.target.value)}
            id="totalClass"
            name="totalClass"
            autoComplete="off"
            placeholder="totalClass"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="selectCourse">Select Course</label>
          <select
            value={course}
            onChange={e => setCourse(Number(e.target.value))}
            id="selectCourse"
            name="course"
          >
            <option value="1">Course 1</option>
            <option value="2">Course 2</option>
            <option value="3">Course 3</option>
            <option value="4">Course 4</option>
            <option value="5">Course 5</option>
          </select>
        </div>
        
        <div className="inputGroup">
          <button type="submit">Update User</button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
