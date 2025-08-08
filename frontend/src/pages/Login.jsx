import { NetworkStatus, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { USER_LOGIN } from "../apollo/Mutation";
import { GET_USERS } from "../apollo/Query";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";

export const userLogin = async ({ request }) => {
  try {
    const res = await request.formData();
    const data = Object.fromEntries(res);
  } catch (error) {
    console.log(error.message);
  }
};

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [signin] = useMutation(USER_LOGIN, {
    NetworkStatus: true,
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
    e.preventDefault();

    try {
      const { data } = await signin({
        variables: {
          login: formData,
        },
      });

      if (data?.signin) {
        dispatch(
          setCredentials({
            user: {
              userId: data.signin.user.id,
              fullName: data.signin.user.fullName,
              role: data.signin.user.role,
            },
            token: data.signin.token,
          })
        );
        navigate("/");
      } else {
        console.log("Invalid login credential!");
      }
    } catch (error) {
      console.error("Error Login ", error.message);
      alert("Login failed, Please try again!");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
          <button type="submit" className="btn">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};
