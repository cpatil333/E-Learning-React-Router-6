import { NetworkStatus, useMutation } from "@apollo/client";
import { GET_USER } from "../apollo/Query";
import { USER_UPDATE } from "../apollo/Mutation";
import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

export const EditUser = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const getUserById = useLoaderData();
  console.log(getUserById.userById);
  
  const [udpateUser] = useMutation(USER_UPDATE, {
    NetworkStatus: true,
    onCompleted() {
      navigate("/");
    },
  });

  useEffect(() => {
    if (getUserById.userById) {
      setFormData({
        fullName: getUserById.userById.fullName,
        email: getUserById.userById.email,
        password: getUserById.userById.password,
        role: getUserById.userById.role,
      });
    }
  }, [getUserById]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const { data } = udpateUser({
        variables: {
          update: {
            id: getUserById.userById.id,
            ...formData,
          },
        },
        refetchQueries: [{ GET_USER }],
        awaitRefetchQueries: true,
      });
      if (data?.udpateUser) {
        alert("User data updated successfully!");
        navigate("/");
      }
    } catch (error) {
      console.log("User Data Error ", error.message);
      alert("User data updated failed, please enter proper data");
    }
  };

  return (
    <div className="container">
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            placeholder="Full Name"
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Email"
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder="Password"
            onChange={handleChange}
          />
        </div>
        <div>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="select">Select</option>
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
          </select>
        </div>
        <div>
          <button type="submit" className="btn">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
