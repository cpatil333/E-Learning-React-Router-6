import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { USER_DELETE } from "../apollo/Mutation";

export const Home = () => {
  const navigate = useNavigate();
  const userList = useLoaderData();
  const [userDelete] = useMutation(USER_DELETE);
  console.log(userList);

  const handleDelete = (e) => {
    const userId = e;
    try {
      const { data } = userDelete({
        variables: {
          userDeleteId: userId,
        },
      });
      console.log(data);
      if (data?.userDelete) {
        alert("User Deleted successfully!");
        navigate("/");
      }
    } catch (error) {
      console.log("User Deleted Error ", error.message);
      alert("Error user deleted failed");
    }
  };

  return (
    <div className="container">
      <h2>User List</h2>
      <div>
        <button className="btn" onClick={() => navigate("/create-user")}>
          Add User
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userList.users.map((user) => (
            <tr key={user.id}>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button
                  className="editbtn"
                  onClick={() => navigate(`/update-user/` + user.id)}
                >
                  Edit
                </button>
                <button
                  className="deletebtn"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
