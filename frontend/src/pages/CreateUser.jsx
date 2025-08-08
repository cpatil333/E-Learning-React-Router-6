import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { USER_REGISTER } from "../apollo/Mutation";
import { GET_USERS } from "../apollo/Query";
import { useNavigate } from "react-router-dom";

export const userData = async ({ request }) => {
  try {
    const res = await request.formData();
    const data = Object.fromEntries(res);
    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
};

export const CreateUser = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [userRegister] = useMutation(USER_REGISTER, {
    onCompleted() {
      navigate("/");
    },
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
    try {
      const { data } = await userRegister({
        variables: {
          register: formData,
        },
        refetchQueries: [{ query: GET_USERS }],
        awaitRefetchQueries: true,
      });
      if (data?.signup) {
        alert("Register has been successfully!");
        navigate("/");
      }
    } catch (error) {
      console.log("Register Error ", error.message);
      alert("Register failed, please enter proper data");
    }
  };

  return (
    <div className="container">
      <h2>User Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
        </div>
        <div>
          <select name="role" onChange={handleChange}>
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
