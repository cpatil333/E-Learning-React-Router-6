import React from "react";
import { GET_USERS } from "../apollo/Query.jsx";
import { useQuery } from "@apollo/client";

export const getUserData = async () => {
  const { data, loading, error } = useQuery(GET_USERS);
  if (loading) return <p>Loading....</p>;
  if (error) {
    console.log("Error, ", error.message);
  }
  try {
    const userData = data;
    return userData;
  } catch (error) {
    console.log("Error ", error.message);
    console.error("Errot in the Fething data");
  }
};
