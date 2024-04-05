import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../getUser/User.css";
import axios from "axios";

export const Admin = () => {
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://attendance-znk2.onrender.com/api/getAll");
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const attendClass = async (userId) => {
    try {
      await axios.put(`https://attendance-znk2.onrender.com/api/user/${userId}/attendClass`);
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
      <Link to={"/add"} className="addButton">
        Add User
      </Link>
      <Link to={"/"} className="logoutButton">
        Logout
      </Link>

      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Name</th>
            <th>User Email</th>
            <th>Attendanded Class</th>
            <th>Total Classes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr key={user._id}> 
                <td>{index + 1}</td>
                <td>
                  {user.fname} {user.lname}
                </td>
                <td>{user.email}</td>
                <td>{user.attendedClass}</td>
                <td>{user.totalClass}</td>
                <td className="actionButton">
                  <button onClick={() => attendClass(user._id)}>
                    <i className="fa-solid fa-user-plus"></i>
                  </button>
                  <Link to={`/edit/` + user._id}>
                    <i className="fa-solid fa-pen-to-square"></i>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default Admin;
