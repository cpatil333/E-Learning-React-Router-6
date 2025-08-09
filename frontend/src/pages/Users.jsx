import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { USER_DELETE } from "../apollo/Mutation";
import { getUsersFilter } from "../API/getUsersFilter";

export const Users = () => {
  const navigate = useNavigate();
  const userList = useLoaderData();
  //console.log(userList);
  const [names, setNames] = useState([]);
  const [emails, setEmails] = useState([]);
  const [roles, setRoles] = useState([]);
  const [userDelete] = useMutation(USER_DELETE);

  const [search, setSearch] = useState({
    fullName: "",
    email: "",
    role: "",
  });

  const {
    data: filterData,
    loading: filterLoding,
    error: filterError,
  } = getUsersFilter(search);

  //calling method for fill dropdownlist
  useEffect(() => {
    const data = userList.users;
    setNames(
      [...new Set(data.map((u) => u.fullName))].map((fullName) => ({
        fullName,
      }))
    );
    setEmails(
      [...new Set(data.map((u) => u.email))].map((email) => ({ email }))
    );
    setRoles([...new Set(data.map((u) => u.role))]);
  }, [userList]);

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

  const handleSelect = (e) => {
    setSearch((prev) => ({
      ...prev,
      [e.target.name]: e.target.value === "select" ? "" : e.target.value,
    }));
  };

  //console.log(search);
  const displayUsers = filterData?.userFilter || userList.users;

  return (
    <div className="container">
      <h2>User List</h2>
      <div>
        <button className="btn" onClick={() => navigate("/create-user")}>
          Add User
        </button>
      </div>
      <div className="filter-select">
        <div>
          <label>Full Name :</label>
          <select name="fullName" onChange={handleSelect}>
            <option>Select</option>
            {names.map((name) => (
              <option key={name.fullName} value={name.fullName}>
                {name.fullName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Email :</label>
          <select name="email" onChange={handleSelect}>
            <option>Select</option>
            {emails.map((email) => (
              <option key={email.email} value={email.email}>
                {email.email}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Role :</label>
          <select name="role" onChange={handleSelect}>
            <option>Select</option>
            {roles.map((role, idx) => (
              <option key={idx} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
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
