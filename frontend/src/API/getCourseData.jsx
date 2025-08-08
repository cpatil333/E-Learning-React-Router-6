import React from "react";
import { useQuery } from "@apollo/client";
import { GET_COURSES } from "../apollo/Query";

export const getCourseData = () => {
  const { data, loading, error } = useQuery(GET_COURSES);
  if (loading) return <p>Loading....</p>;
  if (error) {
    console.log("Error, ", error.message);
  }
  try {
    const courseData = data;
    return courseData;
  } catch (error) {
    console.log("Error ", error.message);
    console.error("Errot Fething courses data");
  }
};
