import React from "react";
import { GET_COURSE } from "../apollo/Query";
import { useQuery } from "@apollo/client";

export const getCourse = ({ params }) => {
  const courseId = params.id;
  const { data, loading, error } = useQuery(GET_COURSE, {
    variables: {
      courseById: courseId,
    },
  });

  if (loading) return <p>Loading....</p>;
  
  if (error) {
    console.log("Error ", error.message);
  }
  try {
    const courseData = data;
    return courseData;
  } catch (error) {
    console.log("Error ", error.message);
  }
};
