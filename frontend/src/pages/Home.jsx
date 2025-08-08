import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { USER_DELETE } from "../apollo/Mutation";
import { getSearchFilter } from "../API/getSearchFilter";

export const Home = () => {
  const navigate = useNavigate();
  const userList = useLoaderData();
  const [searchTxt, setSearchTxt] = useState("");
  const [userDelete] = useMutation(USER_DELETE);
  //console.log(userList);
  const {
    data: filterData,
    loading: filterLoading,
    error: filterError,
  } = getSearchFilter(searchTxt);

  const handleSearch = (e) => {
    setSearchTxt(e.target.value);
  };

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

  const displayUsers = filterData?.userSearch || userList.users;
  console.log(filterData);
  return (
    <div className="container">
      <h2>User List</h2>
      <div>
        <button className="btn" onClick={() => navigate("/create-user")}>
          Add User
        </button>
      </div>
      <div>
        <input type="text" placeholder="Search...." onKeyUp={handleSearch} />
      </div>
      {filterLoading && <p>Loading...</p>}
      {filterError && <p>Error: {filterError.message}</p>}
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
          {displayUsers.map((user) => (
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
