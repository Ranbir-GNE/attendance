import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "../getUser/User.css";

export const User = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const location = useLocation();
  const id = location.state && location.state.id;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!id) {
          setError("User ID not found in location state");
          return;
        }

        const response = await axios.get(`http://localhost:8000/api/getUser/${id}`);
        // console.log(response.data); // Assuming your backend route for getting user data is /api/user
        setUserData(response.data.user); // Accessing user data from the 'user' key
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUserData();
  }, [id]); // Ensure useEffect runs when ID changes

  const attendClass = async (userId) => {
    // Implement your attendClass functionality here
  };

  return (
    <div className="userTable">
      {userData ? (
        <div>
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
              <tr key={userData._id}>
                <td>1</td>
                <td>{userData.fname} {userData.lname}</td>
                <td>{userData.email}</td>
                <td>{userData.attendedClass}</td>
                <td>{userData.totalClass}</td>
                <td className="actionButton">
                  <button onClick={() => attendClass(userData._id)}>
                    <i className="fa-solid fa-user-plus"></i>
                  </button>
                  {/* You might need to import Link from react-router-dom */}
                  {/* Assuming '/edit' route is for editing user */}
                  <Link to={`/edit/${userData._id}`}>
                    <i className="fa-solid fa-pen-to-square"></i>
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default User;
