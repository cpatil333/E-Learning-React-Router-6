import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { USER_DELETE } from "../apollo/Mutation";
import { getUsersFilter } from "../API/getUsersFilter";
import { getUserPagination } from "../API/getUserPagination";

export const Users = () => {
  const navigate = useNavigate();
  const userList = useLoaderData();
  //console.log(userList);
  const [names, setNames] = useState([]);
  const [emails, setEmails] = useState([]);
  const [roles, setRoles] = useState([]);
  const [userDelete] = useMutation(USER_DELETE);

  // calling pagination user data
  const [page, setPage] = useState(1);
  const limit = 4; // how many rows per page

  const [search, setSearch] = useState({
    fullName: "",
    email: "",
    role: "",
  });

  //calling search filter data
  const {
    data: filterData,
    loading: filterLoding,
    error: filterError,
  } = getUsersFilter(search);

  //calling pagination user data
  const { data: paginateData } = getUserPagination({
    page,
    limit,
  });

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

  // build a source list fallback (filtered if present else loader)
  const sourceList = filterData?.userFilter ?? userList?.users ?? [];

  // totalPages fallback: prefer server-provided, otherwise compute from local source
  const totalPages =
    paginateData?.userPagination?.totalPages ??
    Math.max(1, Math.ceil((sourceList.length || 0) / limit));

  // clamp page if totalPages changed (prevents page > totalPages)
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
    if (page < 1) setPage(1);
  }, [totalPages, page]);

  // reset page to 1 when search/filter changes (optional, usually desired)
  useEffect(() => {
    setPage(1);
  }, [search.fullName, search.email, search.role]);

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

  //console.log(search);
  const displayUsers =
    filterData?.userFilter ||
    paginateData?.userPagination.items ||
    userList.users;

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
      <div className="pagination">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Prev
        </button>

        {Array.from(
          { length: paginateData?.userPagination?.totalPages || 1 },
          (_, i) => (
            <button
              key={i}
              className={page === i + 1 ? "active" : ""}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          )
        )}
        <button
          disabled={page === paginateData?.userPagination?.totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};
