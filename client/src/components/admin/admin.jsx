import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../getUser/User.css";
import axios from "axios";

export const Admin = () => {
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/getAll");
      setUsers(response.data);
      console.log(response.data)
    } catch (error) {
      console.error(error);
    }
  };

  const attendClass = async (userId) => {
    try {
      await axios.put(`http://localhost:8000/api/user/${userId}/attendClass`);
      // After the request is successful, fetch the user data again to update the UI
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div className="userTable">
      <div className="btns">
        <Link to={"/add"} className="addButton">
          Add User
        </Link>
        <Link to={"/"} className="logoutButton">
          Logout
        </Link>
      </div>

      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Name</th>
            <th>User Email</th>
            <th>Course 1</th>
            <th>Course 2</th>
            <th>Course 3</th>
            <th>Course 4</th>
            <th>Course 5</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>
                {user.fname} {user.lname}
              </td>
              <td>{user.email}</td>
              {user.courses.sort((a,b) =>  a.courseNumber - b.courseNumber).map((course) => (
                <td key={course.courseNumber}>
                {course.totalClass !== 0 ? `${((course.attendedClass / course.totalClass) * 100).toPrecision(4)} %` : "N/A" }
                </td>
              ))}

              <td className="actionButton">
                <button onClick={() => attendClass(user._id)}>
                  <i className="fa-solid fa-user-plus"></i>
                </button>
                <Link to={`/edit/` + user._id}>
                  <i className="fa-solid fa-pen-to-square"></i>
                </Link>
                <Link to={`/course/` + user._id}>
                  <i className="fas fa-book"></i>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Admin;
